'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { mockProperties } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Waves,
  Calendar as CalendarIcon,
  MessageSquare,
  Heart,
  Share,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Generate static params for all properties
export function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyPage() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
          <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    if (nights <= 0) return 0;
    return nights * property.price;
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'pool':
        return <Waves className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-[60vh] max-h-[500px] bg-gray-900">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button size="sm" variant="secondary">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" variant="secondary">
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{property.rating}</span>
                  <span>({property.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-5 w-5" />
                  <span>{property.location}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5" />
                  <span>{property.maxGuests} guests</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bed className="h-5 w-5" />
                  <span>{property.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="h-5 w-5" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={property.owner.avatar} alt={property.owner.name} />
                    <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">Hosted by {property.owner.name}</h3>
                    <p className="text-gray-600">Superhost · 2 years hosting</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Host
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this place</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>What this place offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3">
                      {getAmenityIcon(amenity)}
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{property.rating} · {property.reviews.length} reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {property.reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet</p>
                ) : (
                  <div className="space-y-4">
                    {property.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
                            <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.customer.name}</p>
                            <p className="text-sm text-gray-500">
                              {review.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${property.price}</span>
                  <span className="text-lg text-gray-600">night</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin">Check-in</Label>
                    <Input
                      id="checkin"
                      type="date"
                      value={checkIn ? checkIn.toISOString().split('T')[0] : ''}
                      onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Check-out</Label>
                    <Input
                      id="checkout"
                      type="date"
                      value={checkOut ? checkOut.toISOString().split('T')[0] : ''}
                      onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max={property.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  />
                </div>
                
                {checkIn && checkOut && (
                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between">
                      <span>${property.price} × {calculateNights()} nights</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowBookingModal(true)}
                  disabled={!checkIn || !checkOut}
                >
                  {!checkIn || !checkOut ? 'Select dates' : 'Reserve'}
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
