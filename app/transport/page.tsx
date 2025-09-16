"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Truck,
  Calendar,
  Users,
  Clock,
  Phone,
  MessageCircle,
  Filter,
  ArrowLeft,
  Leaf,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function TransportPage() {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    date: "",
    vehicleType: "",
  })

  const transportGroups = [
    {
      id: 1,
      route: "Kumasi to Accra - Weekly",
      schedule: "Every Friday",
      departureTime: "8:00 AM",
      from: "Kumasi Central Market",
      to: "Accra Mall",
      vehicle: "5-ton Truck",
      price: "₵50 per 100kg",
      spotsLeft: 3,
      totalSpots: 8,
      organizer: "Kwame Transport",
      phone: "+233 24 123 4567",
      estimatedDuration: "4 hours",
      nextDeparture: "Tomorrow",
    },
    {
      id: 2,
      route: "Tamale to Kumasi - Tomorrow",
      schedule: "Tomorrow, 8:00 AM",
      departureTime: "8:00 AM",
      from: "Tamale Main Market",
      to: "Kejetia Market",
      vehicle: "10-ton Truck",
      price: "₵80 per 100kg",
      spotsLeft: 5,
      totalSpots: 10,
      organizer: "Northern Express",
      phone: "+233 24 234 5678",
      estimatedDuration: "6 hours",
      nextDeparture: "Tomorrow",
    },
    {
      id: 3,
      route: "Accra to Cape Coast - Weekly",
      schedule: "Every Wednesday",
      departureTime: "10:00 AM",
      from: "Accra Central",
      to: "Cape Coast Market",
      vehicle: "7-ton Truck",
      price: "₵40 per 100kg",
      spotsLeft: 2,
      totalSpots: 6,
      organizer: "Coastal Transport",
      phone: "+233 24 345 6789",
      estimatedDuration: "3 hours",
      nextDeparture: "In 2 days",
    },
    {
      id: 4,
      route: "Sunyani to Accra - Daily",
      schedule: "Daily",
      departureTime: "6:00 AM",
      from: "Sunyani Market",
      to: "Madina Market",
      vehicle: "8-ton Truck",
      price: "₵60 per 100kg",
      spotsLeft: 7,
      totalSpots: 12,
      organizer: "Brong Ahafo Express",
      phone: "+233 24 456 7890",
      estimatedDuration: "5 hours",
      nextDeparture: "Tomorrow",
    },
  ]

  const locations = [
    "Kumasi",
    "Accra",
    "Tamale",
    "Cape Coast",
    "Sunyani",
    "Ho",
    "Koforidua",
    "Takoradi",
    "Wa",
    "Bolgatanga",
  ]

  const vehicleTypes = ["Small Truck (3-5 tons)", "Medium Truck (5-8 tons)", "Large Truck (8+ tons)", "Pickup Truck"]

  const filteredGroups = transportGroups.filter((group) => {
    if (filters.from && !group.from.toLowerCase().includes(filters.from.toLowerCase())) return false
    if (filters.to && !group.to.toLowerCase().includes(filters.to.toLowerCase())) return false
    if (filters.vehicleType && !group.vehicle.includes(filters.vehicleType.split(" ")[0])) return false
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Transport Groups</h1>
              <p className="text-gray-600 text-sm sm:text-base">Join other farmers to share transport costs</p>
            </div>
            <Link href="/transport/create">
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
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
                  <Label htmlFor="from" className="text-sm font-medium mb-2 block">
                    From Location
                  </Label>
                  <Select value={filters.from} onValueChange={(value) => setFilters({ ...filters, from: value })}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="to" className="text-sm font-medium mb-2 block">
                    To Location
                  </Label>
                  <Select value={filters.to} onValueChange={(value) => setFilters({ ...filters, to: value })}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date" className="text-sm font-medium mb-2 block">
                    Departure Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="vehicleType" className="text-sm font-medium mb-2 block">
                    Vehicle Type
                  </Label>
                  <Select
                    value={filters.vehicleType}
                    onValueChange={(value) => setFilters({ ...filters, vehicleType: value })}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() =>
                    setFilters({
                      from: "",
                      to: "",
                      date: "",
                      vehicleType: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transport Groups */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <p className="text-gray-600 text-sm sm:text-base">{filteredGroups.length} transport groups found</p>
              <Select defaultValue="departure">
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departure">Next Departure</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="spots">Available Spots</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                          <h3 className="text-lg font-semibold">{group.route}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              {group.spotsLeft} of {group.totalSpots} spots left
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {group.nextDeparture}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-green-600 mr-2" />
                            <span>{group.schedule}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-green-600 mr-2" />
                            <span>Departs: {group.departureTime}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Truck className="w-4 h-4 text-green-600 mr-2" />
                            <span>{group.vehicle}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users className="w-4 h-4 text-green-600 mr-2" />
                            <span>Duration: {group.estimatedDuration}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">From:</p>
                            <p className="text-gray-600 flex items-center text-sm">
                              <MapPin className="w-3 h-3 text-green-600 mr-1" />
                              {group.from}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">To:</p>
                            <p className="text-gray-600 flex items-center text-sm">
                              <MapPin className="w-3 h-3 text-green-600 mr-1" />
                              {group.to}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                          <div>
                            <p className="text-sm text-gray-500">Organizer</p>
                            <p className="font-medium">{group.organizer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="font-bold text-lg text-green-600">{group.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 pt-4 border-t">
                      <Link href={`/transport/${group.id}`} className="flex-1">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
                          <Users className="w-4 h-4 mr-2" />
                          Join Group
                        </Button>
                      </Link>
                      <Link href={`/chat/${group.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-green-600 text-green-600 hover:bg-green-50 text-sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      </Link>
                      <Button variant="outline" className="flex-1 text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Call</span>
                        <span className="sm:hidden">Call</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <Truck className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No transport groups found</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Link href="/transport/create">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Group
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
