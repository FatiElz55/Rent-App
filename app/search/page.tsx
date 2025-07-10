'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockProperties } from '@/data/mockData';
import { Property, SearchFilters } from '@/types';
import PropertyCard from '@/components/common/PropertyCard';
import SearchBar from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Filter, X } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get('location') || '',
    guests: searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined,
    minPrice: 0,
    maxPrice: 500,
    bedrooms: undefined,
    amenities: [],
  });

  const amenitiesList = ['WiFi', 'Kitchen', 'Pool', 'Parking', 'Air Conditioning', 'Fireplace', 'Hot Tub', 'Beach Access'];

  useEffect(() => {
    filterProperties();
  }, [filters]);

  const filterProperties = () => {
    let filtered = mockProperties;

    if (filters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(filters.location!.toLowerCase()) ||
        property.title.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.guests) {
      filtered = filtered.filter(property => property.maxGuests >= filters.guests!);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms!);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(property => 
        filters.amenities!.every(amenity => property.amenities.includes(amenity))
      );
    }

    setProperties(filtered);
  };

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      guests: undefined,
      minPrice: 0,
      maxPrice: 500,
      bedrooms: undefined,
      amenities: [],
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Filters</CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                    <Slider
                      value={[filters.minPrice || 0, filters.maxPrice || 500]}
                      onValueChange={([min, max]) => setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
                      max={500}
                      step={10}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${filters.minPrice}</span>
                      <span>${filters.maxPrice}</span>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Bedrooms</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map(num => (
                        <Button
                          key={num}
                          variant={filters.bedrooms === num ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            bedrooms: prev.bedrooms === num ? undefined : num 
                          }))}
                        >
                          {num}+
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Amenities</Label>
                    <div className="space-y-2">
                      {amenitiesList.map(amenity => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={filters.amenities?.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity)}
                          />
                          <Label htmlFor={amenity} className="text-sm cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
              </h1>
              
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {filters.location && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {filters.location}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, location: '' }))}
                    />
                  </Badge>
                )}
                {filters.guests && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {filters.guests} guests
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, guests: undefined }))}
                    />
                  </Badge>
                )}
                {filters.bedrooms && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {filters.bedrooms}+ bedrooms
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({ ...prev, bedrooms: undefined }))}
                    />
                  </Badge>
                )}
              </div>
            </div>

            {properties.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}