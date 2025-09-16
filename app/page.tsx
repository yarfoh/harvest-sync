"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Warehouse,
  Truck,
  Users,
  Calendar,
  Phone,
  CreditCard,
  MessageCircle,
  Leaf,
  Search,
  ArrowRight,
  UserPlus,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [searchRegion, setSearchRegion] = useState("")
  const [searchDistrict, setSearchDistrict] = useState("")

  const languages = {
    en: "English",
    tw: "Twi",
    ew: "Ewe",
    ga: "Ga",
    ha: "Hausa",
  }

  const regions = [
    "Ashanti",
    "Greater Accra",
    "Eastern",
    "Northern",
    "Western",
    "Central",
    "Volta",
    "Upper East",
    "Upper West",
    "Brong-Ahafo",
  ]

  const storageListings = [
    {
      id: 1,
      name: "Kumasi Cold Storage",
      location: "Asokwa, Kumasi, Ashanti",
      type: "Cold Storage",
      capacity: "5,000 kg",
      price: "₵0.50/kg/day",
      status: "Available",
      image: "/images/cold-storage.jpeg",
    },
    {
      id: 2,
      name: "Ejisu Grain Store",
      location: "Ejisu, Ashanti",
      type: "Dry Storage",
      capacity: "10,000 kg",
      price: "₵0.30/kg/day",
      status: "Available",
      image: "/images/grain-storage.webp",
    },
    {
      id: 3,
      name: "Accra Fresh Storage",
      location: "Madina, Accra",
      type: "Cold Storage",
      capacity: "2,500 kg",
      price: "₵0.75/kg/day",
      status: "Limited Space",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    },
  ]

  const transportGroups = [
    {
      id: 1,
      route: "Kumasi to Accra - Weekly",
      schedule: "Every Friday",
      from: "Kumasi Central Market",
      to: "Accra Mall",
      vehicle: "5-ton Truck",
      price: "₵50 per 100kg",
      spotsLeft: 3,
    },
    {
      id: 2,
      route: "Tamale to Kumasi - Tomorrow",
      schedule: "Tomorrow, 8:00 AM",
      from: "Tamale Main Market",
      to: "Kejetia Market",
      vehicle: "10-ton Truck",
      price: "₵80 per 100kg",
      spotsLeft: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="text-green-700 text-xl sm:text-2xl" />
            <h1 className="text-lg sm:text-xl font-bold text-green-700">Harvest Sync</h1>
          </Link>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-24 sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Link href="/auth/login">
              <Button className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-2 sm:px-4">
                <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative text-white py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
          alt="Agricultural field at sunset"
          fill
          className="object-cover z-0"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Connect, Store & Transport Your Harvest
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-10 text-white/90 leading-relaxed">
              Find storage spaces, join transport groups, and reduce post-harvest losses across Ghana
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
              <Link href="/storage">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 w-full sm:w-auto">
                  <Warehouse className="w-4 h-4 mr-2" />
                  Find Storage
                </Button>
              </Link>
              <Link href="/transport">
                <Button size="lg" className="bg-green-800 hover:bg-green-900 w-full sm:w-auto">
                  <Truck className="w-4 h-4 mr-2" />
                  Join Transport
                </Button>
              </Link>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-3 sm:p-4">
                <Tabs defaultValue="storage" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="storage" className="text-xs sm:text-sm">
                      Storage
                    </TabsTrigger>
                    <TabsTrigger value="transport" className="text-xs sm:text-sm">
                      Transport
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="storage" className="mt-3 sm:mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <Select value={searchRegion} onValueChange={setSearchRegion}>
                        <SelectTrigger className="text-xs sm:text-sm">
                          <SelectValue placeholder="Select Region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={searchDistrict} onValueChange={setSearchDistrict}>
                        <SelectTrigger className="text-xs sm:text-sm">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kumasi-metro">Kumasi Metro</SelectItem>
                          <SelectItem value="ejisu-juaben">Ejisu-Juaben</SelectItem>
                          <SelectItem value="atwima-nwabiagya">Atwima Nwabiagya</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button className="bg-green-600 hover:bg-green-700 col-span-1 sm:col-span-2 lg:col-span-1">
                        <Search className="w-4 h-4 mr-1" />
                        <span className="text-xs sm:text-sm">Search</span>
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="transport" className="mt-3 sm:mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      <Select>
                        <SelectTrigger className="text-xs sm:text-sm">
                          <SelectValue placeholder="From Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kumasi">Kumasi</SelectItem>
                          <SelectItem value="accra">Accra</SelectItem>
                          <SelectItem value="tamale">Tamale</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select>
                        <SelectTrigger className="text-xs sm:text-sm">
                          <SelectValue placeholder="To Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kumasi">Kumasi</SelectItem>
                          <SelectItem value="accra">Accra</SelectItem>
                          <SelectItem value="tamale">Tamale</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button className="bg-green-600 hover:bg-green-700 col-span-1 sm:col-span-2 lg:col-span-1">
                        <Search className="w-4 h-4 mr-1" />
                        <span className="text-xs sm:text-sm">Search</span>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">How Harvest Sync Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Simple steps to connect you with storage and transport solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl">
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="text-green-700 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">1. Find Nearby Storage</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Easily search for storage facilities in your community with available capacity for your crops.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl">
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CreditCard className="text-green-700 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">2. Book & Pay Easily</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Reserve space and pay using Mobile Money, USSD or bank transfer.
              </p>
            </div>

            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl">
              <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="text-green-700 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">3. Share Transport</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Join other farmers to transport goods together and save costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Listings Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Available Storage Spaces</h2>
            <Link href="/storage" className="text-green-700 font-medium flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storageListings.map((storage) => (
              <Card key={storage.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image src={storage.image || "/placeholder.svg"} alt={storage.name} fill className="object-cover" />
                  <Badge
                    className={`absolute top-3 left-3 ${
                      storage.type === "Cold Storage" ? "bg-green-600" : "bg-amber-600"
                    }`}
                  >
                    {storage.type}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{storage.name}</h3>
                    <Badge variant={storage.status === "Available" ? "default" : "destructive"}>{storage.status}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 flex items-center">
                    <MapPin className="w-4 h-4 text-green-600 mr-1" />
                    {storage.location}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Capacity</p>
                      <p className="font-medium">{storage.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">{storage.price}</p>
                    </div>
                  </div>

                  <Link href={`/storage/${storage.id}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Pooling Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Available Transport Groups</h2>
            <Link href="/transport" className="text-green-700 font-medium flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transportGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{group.route}</h3>
                    <Badge className="bg-blue-100 text-blue-800">{group.spotsLeft} spots left</Badge>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 text-green-600 mr-2" />
                    <span>{group.schedule}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">From:</p>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 text-green-600 mr-1" />
                        {group.from}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">To:</p>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 text-green-600 mr-1" />
                        {group.to}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Vehicle</p>
                      <p className="font-medium">{group.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">{group.price}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/transport/${group.id}`} className="flex-1">
                      <Button className="w-full bg-green-600 hover:bg-green-700">Join Group</Button>
                    </Link>
                    <Link href={`/chat/${group.id}`} className="flex-1">
                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                        Chat
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Options Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">Easy Payment Options</h2>

          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "MTN Mobile Money", icon: Phone, color: "blue" },
              { name: "Vodafone Cash", icon: Phone, color: "purple" },
              { name: "Bank Transfer", icon: CreditCard, color: "green" },
              { name: "USSD Payment", icon: Phone, color: "yellow" },
            ].map((payment, index) => (
              <Card key={index} className="p-3 sm:p-4 text-center">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-${payment.color}-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3`}
                >
                  <payment.icon className={`text-${payment.color}-600 text-lg sm:text-2xl`} />
                </div>
                <h3 className="font-medium text-xs sm:text-sm">{payment.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-12 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Harvest Sync?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're a farmer needing storage and transport, or a storage owner with space to rent, join our
            platform to connect with Ghana's agricultural community.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/auth/register?type=farmer">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 w-full sm:w-auto">
                <UserPlus className="w-4 h-4 mr-2" />
                Register as Farmer
              </Button>
            </Link>
            <Link href="/storage/register">
              <Button size="lg" className="bg-green-800 hover:bg-green-900 w-full sm:w-auto">
                <Warehouse className="w-4 h-4 mr-2" />
                List Your Storage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Leaf className="text-green-500 text-3xl" />
                <h3 className="text-2xl font-bold">Harvest Sync</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Connecting Ghana's agricultural community to reduce post-harvest losses and improve market access.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/storage" className="text-gray-400 hover:text-white text-sm">
                    Find Storage
                  </Link>
                </li>
                <li>
                  <Link href="/transport" className="text-gray-400 hover:text-white text-sm">
                    Join Transport
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-gray-400 hover:text-white text-sm">
                    Safety Tips
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400 text-sm">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  +233 24 123 4567
                </li>
                <li className="flex items-center text-gray-400 text-sm">
                  <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                  info@harvestsync.com
                </li>
                <li className="flex items-center text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-green-500" />
                  Kumasi, Ghana
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Harvest Sync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
