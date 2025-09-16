"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Star,
  Phone,
  Mail,
  Clock,
  Thermometer,
  Wind,
  ArrowLeft,
  Leaf,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function StorageDetailPage() {
  const params = useParams()
  const storageId = params.id as string

  // Mock data - in real app, fetch based on ID
  const storageData = {
    "1": {
      id: 1,
      name: "Kumasi Cold Storage",
      location: "Asokwa, Kumasi, Ashanti",
      type: "Cold Storage",
      capacity: 5000,
      availableCapacity: 3200,
      price: 0.5,
      status: "Available",
      rating: 4.8,
      reviews: 24,
      features: ["Temperature Control", "Security", "24/7 Access", "Loading Bay", "CCTV Monitoring"],
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cold-Food-Warehousing.jpg-5sfFkBn2IQTVY8LECvfeWnNEWukpFN.jpeg",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      ],
      owner: {
        name: "Kwame Storage Ltd",
        phone: "+233 24 123 4567",
        email: "info@kwamestorage.com",
        verified: true,
      },
      operatingHours: {
        weekdays: "6:00 AM - 8:00 PM",
        weekends: "7:00 AM - 6:00 PM",
      },
      description:
        "Modern cold storage facility with state-of-the-art refrigeration systems. Perfect for storing fresh produce, vegetables, and fruits. Our facility maintains optimal temperature and humidity levels to preserve your harvest quality.",
      specifications: {
        temperature: "-2°C to 4°C",
        humidity: "85-90%",
        powerBackup: "24/7 Generator Backup",
        security: "24/7 Security Guards + CCTV",
      },
      acceptedCrops: ["Tomatoes", "Onions", "Pepper", "Cabbage", "Lettuce", "Carrots"],
      location_details: {
        address: "Plot 15, Industrial Area, Asokwa, Kumasi",
        landmarks: "Near Kumasi Technical University, Behind Shell Filling Station",
        gps: "AK-039-5678",
      },
    },
    "2": {
      id: 2,
      name: "Ejisu Grain Store",
      location: "Ejisu, Ashanti",
      type: "Dry Storage",
      capacity: 10000,
      availableCapacity: 7500,
      price: 0.3,
      status: "Available",
      rating: 4.6,
      reviews: 18,
      features: ["Pest Control", "Ventilation", "Loading Bay", "Weighing Scale", "Sorting Area"],
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grain-storage-2048x1072.jpeg-rISHnQJjxahuzIPtWzDGs1KiVPsA44.webp",
        "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1605000797499-95e51c3d49d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      ],
      owner: {
        name: "Ama Grain Storage",
        phone: "+233 24 234 5678",
        email: "contact@amagrains.com",
        verified: true,
      },
      operatingHours: {
        weekdays: "5:00 AM - 7:00 PM",
        weekends: "6:00 AM - 5:00 PM",
      },
      description:
        "Large capacity grain storage warehouse with excellent ventilation and pest control systems. Ideal for storing cereals, legumes, and other dry crops. Our facility ensures your grains remain dry and pest-free.",
      specifications: {
        humidity: "Below 14%",
        ventilation: "Natural & Mechanical Ventilation",
        pestControl: "Fumigation Services Available",
        security: "Perimeter Fencing + Night Guards",
      },
      acceptedCrops: ["Maize", "Rice", "Beans", "Groundnuts", "Millet", "Sorghum"],
      location_details: {
        address: "Ejisu-Besease Road, Ejisu",
        landmarks: "500m from Ejisu Market, Near Agricultural Development Bank",
        gps: "AS-123-4567",
      },
    },
  }

  const storage = storageData[storageId as keyof typeof storageData]
  const [selectedImage, setSelectedImage] = useState(0)

  if (!storage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Storage Not Found</h1>
          <Link href="/storage">
            <Button>Back to Storage</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <Link href="/storage">
              <Button variant="ghost" size="sm" className="mr-2 p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="text-green-700 text-xl" />
              <span className="text-lg font-bold text-green-700">Harvest Sync</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                  src={storage.images[selectedImage] || "/placeholder.svg"}
                  alt={storage.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${storage.type === "Cold Storage" ? "bg-blue-600" : "bg-amber-600"}`}>
                    {storage.type === "Cold Storage" ? (
                      <Thermometer className="w-3 h-3 mr-1" />
                    ) : (
                      <Wind className="w-3 h-3 mr-1" />
                    )}
                    {storage.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={storage.status === "Available" ? "default" : "destructive"}>{storage.status}</Badge>
                </div>
              </div>

              {/* Image Thumbnails */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {storage.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-green-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${storage.name} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Storage Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{storage.name}</CardTitle>
                    <p className="text-gray-600 flex items-center mt-2">
                      <MapPin className="w-4 h-4 text-green-600 mr-1" />
                      {storage.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium ml-1">{storage.rating}</span>
                    <span className="text-gray-500 ml-1">({storage.reviews} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">{storage.description}</p>

                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="crops">Crops</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Capacity Information</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Capacity:</span>
                            <span className="font-medium">{storage.capacity.toLocaleString()} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Available:</span>
                            <span className="font-medium text-green-600">
                              {storage.availableCapacity.toLocaleString()} kg
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium">₵{storage.price}/kg/day</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Specifications</h4>
                        <div className="space-y-2">
                          {Object.entries(storage.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {storage.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="crops" className="mt-6">
                    <h4 className="font-semibold mb-3">Accepted Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {storage.acceptedCrops.map((crop, index) => (
                        <Badge key={index} variant="outline">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="location" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Address</h4>
                        <p className="text-gray-700">{storage.location_details.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Landmarks</h4>
                        <p className="text-gray-700">{storage.location_details.landmarks}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">GPS Coordinates</h4>
                        <p className="text-gray-700 font-mono">{storage.location_details.gps}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Book This Storage</CardTitle>
                  <div className="text-2xl font-bold text-green-600">
                    ₵{storage.price}
                    <span className="text-sm font-normal text-gray-600">/kg/day</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Available Space</span>
                    <span className="text-green-600 font-bold">{storage.availableCapacity.toLocaleString()} kg</span>
                  </div>

                  <Link href={`/storage/${storage.id}/book`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </Link>

                  <div className="text-center">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Owner
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Owner Information
                    {storage.owner.verified && <CheckCircle className="w-4 h-4 text-green-600 ml-2" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{storage.owner.name}</h4>
                    {storage.owner.verified && (
                      <Badge variant="secondary" className="mt-1">
                        Verified Owner
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm">{storage.owner.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm">{storage.owner.email}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Operating Hours
                    </h5>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Weekdays:</span>
                        <span>{storage.operatingHours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekends:</span>
                        <span>{storage.operatingHours.weekends}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Notice */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-2">Safety Notice</h4>
                      <p className="text-sm text-amber-700">
                        Always inspect storage facilities before booking. Ensure your crops meet the facility's
                        requirements and storage conditions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
