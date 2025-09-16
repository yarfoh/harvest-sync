"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Warehouse, Filter, Star, Thermometer, Wind, ArrowLeft, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function StoragePage() {
  const [filters, setFilters] = useState({
    region: "",
    district: "",
    storageType: "",
    priceRange: [0, 100],
    capacity: [0, 50000],
  })

  const storageListings = [
    {
      id: 1,
      name: "Kumasi Cold Storage",
      location: "Asokwa, Kumasi, Ashanti",
      type: "Cold Storage",
      capacity: 5000,
      price: 0.5,
      status: "Available",
      rating: 4.8,
      reviews: 24,
      features: ["Temperature Control", "Security", "24/7 Access"],
      image: "/images/cold-storage.jpeg",
      owner: "Kwame Storage Ltd",
      phone: "+233 24 123 4567",
    },
    {
      id: 2,
      name: "Ejisu Grain Store",
      location: "Ejisu, Ashanti",
      type: "Dry Storage",
      capacity: 10000,
      price: 0.3,
      status: "Available",
      rating: 4.6,
      reviews: 18,
      features: ["Pest Control", "Ventilation", "Loading Bay"],
      image: "/images/grain-storage.webp",
      owner: "Ama Grain Storage",
      phone: "+233 24 234 5678",
    },
    {
      id: 3,
      name: "Accra Fresh Storage",
      location: "Madina, Accra",
      type: "Cold Storage",
      capacity: 2500,
      price: 0.75,
      status: "Limited Space",
      rating: 4.9,
      reviews: 31,
      features: ["Refrigeration", "Humidity Control", "Quick Access"],
      image: "/placeholder.svg?height=200&width=300",
      owner: "Fresh Storage Co.",
      phone: "+233 24 345 6789",
    },
    {
      id: 4,
      name: "Tamale Warehouse",
      location: "Tamale, Northern",
      type: "Dry Storage",
      capacity: 15000,
      price: 0.25,
      status: "Available",
      rating: 4.4,
      reviews: 12,
      features: ["Large Capacity", "Vehicle Access", "Sorting Area"],
      image: "/placeholder.svg?height=200&width=300",
      owner: "Northern Storage Hub",
      phone: "+233 24 456 7890",
    },
  ]

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

  const filteredListings = storageListings.filter((storage) => {
    if (filters.region && !storage.location.includes(filters.region)) return false
    if (filters.storageType && storage.type !== filters.storageType) return false
    if (storage.price < filters.priceRange[0] || storage.price > filters.priceRange[1]) return false
    if (storage.capacity < filters.capacity[0] || storage.capacity > filters.capacity[1]) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-2 p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="text-green-700 text-xl" />
              <span className="text-lg font-bold text-green-700">Harvest Sync</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Storage Facilities</h1>
              <p className="text-gray-600 text-sm sm:text-base">Find the perfect storage solution for your harvest</p>
            </div>
            <Link href="/storage/register">
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                <Warehouse className="w-4 h-4 mr-2" />
                List Your Storage
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Region</label>
                  <Select value={filters.region} onValueChange={(value) => setFilters({ ...filters, region: value })}>
                    <SelectTrigger className="text-sm">
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
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Storage Type</label>
                  <Select
                    value={filters.storageType}
                    onValueChange={(value) => setFilters({ ...filters, storageType: value })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                      <SelectItem value="Dry Storage">Dry Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range (₵/kg/day): {filters.priceRange[0]} - {filters.priceRange[1]}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Capacity (kg): {filters.capacity[0]} - {filters.capacity[1]}
                  </label>
                  <Slider
                    value={filters.capacity}
                    onValueChange={(value) => setFilters({ ...filters, capacity: value })}
                    max={50000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() =>
                    setFilters({
                      region: "",
                      district: "",
                      storageType: "",
                      priceRange: [0, 100],
                      capacity: [0, 50000],
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Storage Listings */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <p className="text-gray-600 text-sm sm:text-base">{filteredListings.length} storage facilities found</p>
              <Select defaultValue="rating">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="capacity">Capacity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredListings.map((storage) => (
                <Card key={storage.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 sm:h-48 relative">
                    <Image src={storage.image || "/placeholder.svg"} alt={storage.name} fill className="object-cover" />
                    <Badge
                      className={`absolute top-2 sm:top-3 left-2 sm:left-3 text-xs ${
                        storage.type === "Cold Storage" ? "bg-blue-600" : "bg-amber-600"
                      }`}
                    >
                      {storage.type === "Cold Storage" ? (
                        <Thermometer className="w-3 h-3 mr-1" />
                      ) : (
                        <Wind className="w-3 h-3 mr-1" />
                      )}
                      {storage.type}
                    </Badge>
                    <Badge
                      variant={storage.status === "Available" ? "default" : "destructive"}
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 text-xs"
                    >
                      {storage.status}
                    </Badge>
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm sm:text-lg">{storage.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm font-medium ml-1">{storage.rating}</span>
                        <span className="text-xs sm:text-sm text-gray-500 ml-1">({storage.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm mb-3 flex items-center">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1" />
                      {storage.location}
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Capacity</p>
                        <p className="font-medium text-sm sm:text-base">{storage.capacity.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">Price</p>
                        <p className="font-medium text-sm sm:text-base">₵{storage.price}/kg/day</p>
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-2">Features</p>
                      <div className="flex flex-wrap gap-1">
                        {storage.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-sm text-gray-500">Owner</p>
                      <p className="font-medium text-sm sm:text-base">{storage.owner}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Link href={`/storage/${storage.id}`} className="flex-1">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">View Details</Button>
                      </Link>
                      <Button variant="outline" className="flex-1 text-sm">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <Warehouse className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No storage facilities found</h3>
                <p className="text-gray-600 text-sm sm:text-base">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
