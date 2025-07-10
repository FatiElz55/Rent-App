import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Users, 
  Shield, 
  Star, 
  Globe, 
  Heart,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Properties Listed', value: '10,000+', icon: Home },
    { label: 'Happy Guests', value: '50,000+', icon: Users },
    { label: 'Cities Worldwide', value: '500+', icon: Globe },
    { label: 'Average Rating', value: '4.8', icon: Star },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'All properties are verified and payments are protected with our secure platform.',
    },
    {
      icon: Heart,
      title: 'Carefully Curated',
      description: 'Every property is hand-picked to ensure quality and authentic experiences.',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the best accommodation platform by industry experts.',
    },
    {
      icon: TrendingUp,
      title: 'Growing Community',
      description: 'Join millions of travelers and hosts creating memorable experiences.',
    },
  ];

  const values = [
    {
      title: 'Authenticity',
      description: 'We believe in genuine experiences that connect travelers with local culture.',
    },
    {
      title: 'Community',
      description: 'Building a global community of travelers and hosts who share their passion.',
    },
    {
      title: 'Trust',
      description: 'Creating a safe and secure environment for all our users.',
    },
    {
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-500 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About StayVibe
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              We're on a mission to create a world where anyone can belong anywhere, 
              connecting people through unique travel experiences.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-rose-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  StayVibe was born from a simple idea: everyone should have access to unique, 
                  authentic travel experiences. Founded in 2020, we started as a small team 
                  passionate about connecting travelers with incredible places to stay.
                </p>
                <p>
                  What began as a platform for sharing homes has grown into a global community 
                  of millions of hosts and guests. We've facilitated countless memorable stays, 
                  from cozy apartments in bustling cities to breathtaking villas by the ocean.
                </p>
                <p>
                  Today, we continue to innovate and expand our platform, always keeping our 
                  core mission at heart: creating a world where anyone can belong anywhere.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Founded in 2020</h3>
                <p className="text-gray-600">
                  Started with a vision to revolutionize how people travel and experience the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose StayVibe?
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to providing the best experience for both guests and hosts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-rose-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who have discovered their perfect home away from home with StayVibe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">
                Find Places to Stay
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-500" asChild>
              <Link href="/signup">
                Become a Host
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}