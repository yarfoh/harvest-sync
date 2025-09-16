"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MapPin,
  Truck,
  Calendar,
  Users,
  Clock,
  Phone,
  MessageCircle,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Leaf,
  User,
} from "lucide-react"
import Link from "next/link"

export default function TransportDetailsPage({ params }: { params: { id: string } }) {
  const [joinFormData, setJoinFormData] = useState({
    farmerName: "",
    phoneNumber: "",
    cargoWeight: "",
    cargoType: "",
    specialRequirements: "",
  })

  // Mock data - in real app, fetch based on params.id
  const transportGroup = {
    id: 1,
    route: "Kumasi to Accra - Weekly",
    schedule: "Every Friday",
    departureTime: "8:00 AM",
    from: "Kumasi Central Market",
    fromAddress: "Near the main gate, opposite the yam section",
    to: "Accra Mall",
    toAddress: "Main parking area, Level 1",
    vehicle: "5-ton Truck",
    price: "₵50 per 100kg",
    spotsLeft: 3,
    totalSpots: 8,
    organizer: {
      name: "Kwame Transport",
      phone: "+233 24 123 4567",
      rating: 4.8,
      completedTrips: 45,
      joinedDate: "January 2023",
    },
    estimatedDuration: "4 hours",
    nextDeparture: "Tomorrow",
    description:
      "Regular weekly transport from Kumasi to Accra. We specialize in fresh produce and have temperature-controlled sections available. Reliable service with GPS tracking and insurance coverage.",
    features: ["GPS Tracking", "Insurance Coverage", "Temperature Control", "Loading Assistance"],
    participants: [
      { name: "Ama Serwaa", location: "Ejisu", cargoType: "Tomatoes", weight: "200kg" },
      { name: "Kofi Mensah", location: "Kumasi", cargoType: "Plantain", weight: "150kg" },
      { name: "Akosua Frimpong", location: "Asokwa", cargoType: "Yam", weight: "300kg" },
      { name: "Kwaku Boateng", location: "Bantama", cargoType: "Cassava", weight: "250kg" },
      { name: "Efua Asante", location: "Adum", cargoType: "Pepper", weight: "100kg" },
    ],
    route_details: {
      distance: "250 km",
      estimatedTime: "4 hours",
      stops: ["Kumasi Central Market", "Ejisu Junction", "Nsawam", "Accra Mall"],
    },
  }

  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Join group data:", joinFormData)
    // Handle joining the group
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/transport">
                <Button variant="ghost" size="sm" className="mr-2 p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <Leaf className="text-green-700 text-xl sm:text-2xl" />
                <h1 className="text-lg sm:text-xl font-bold text-green-700">Harvest Sync</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/transport">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Back to Transport</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Transport Group Header */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold mb-2">{transportGroup.route}</h1>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {transportGroup.spotsLeft} of {transportGroup.totalSpots} spots left
                        </Badge>
                        <Badge variant="outline">{transportGroup.nextDeparture}</Badge>
                        <Badge className="bg-green-100 text-green-800">Verified Organizer</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{transportGroup.price}</p>
                      <p className="text-sm text-gray-600">per 100kg</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-green-600 mr-2" />
                      <span>{transportGroup.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-green-600 mr-2" />
                      <span>Departs: {transportGroup.departureTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Truck className="w-4 h-4 text-green-600 mr-2" />
                      <span>{transportGroup.vehicle}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 text-green-600 mr-2" />
                      <span>Duration: {transportGroup.estimatedDuration}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <MapPin className="w-4 h-4 text-green-600 mr-2" />
                        From Location
                      </h3>
                      <p className="font-medium">{transportGroup.from}</p>
                      <p className="text-sm text-gray-600">{transportGroup.fromAddress}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <MapPin className="w-4 h-4 text-green-600 mr-2" />
                        To Location
                      </h3>
                      <p className="font-medium">{transportGroup.to}</p>
                      <p className="text-sm text-gray-600">{transportGroup.toAddress}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Transport Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{transportGroup.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Features & Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {transportGroup.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Route Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Route Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="font-semibold">{transportGroup.route_details.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Time</p>
                      <p className="font-semibold">{transportGroup.route_details.estimatedTime}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Stops Along the Route</h4>
                    <div className="space-y-2">
                      {transportGroup.route_details.stops.map((stop, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          <span className="text-sm">{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Participants */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Participants ({transportGroup.participants.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transportGroup.participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{participant.name}</p>
                            <p className="text-xs text-gray-600">{participant.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{participant.cargoType}</p>
                          <p className="text-xs text-gray-600">{participant.weight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Organizer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{transportGroup.organizer.name}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{transportGroup.organizer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Trips:</span>
                      <span className="font-medium">{transportGroup.organizer.completedTrips}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-medium">{transportGroup.organizer.joinedDate}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Link href={`/chat/${transportGroup.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Join Group Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Join This Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJoinGroup} className="space-y-4">
                    <div>
                      <Label htmlFor="farmerName">Your Name *</Label>
                      <Input
                        id="farmerName"
                        placeholder="Enter your full name"
                        value={joinFormData.farmerName}
                        onChange={(e) => setJoinFormData({ ...joinFormData, farmerName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          +233
                        </span>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="24 123 4567"
                          value={joinFormData.phoneNumber}
                          onChange={(e) => setJoinFormData({ ...joinFormData, phoneNumber: e.target.value })}
                          className="rounded-l-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cargoWeight">Cargo Weight (kg) *</Label>
                      <Input
                        id="cargoWeight"
                        type="number"
                        placeholder="e.g., 200"
                        value={joinFormData.cargoWeight}
                        onChange={(e) => setJoinFormData({ ...joinFormData, cargoWeight: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cargoType">Cargo Type *</Label>
                      <Input
                        id="cargoType"
                        placeholder="e.g., Tomatoes, Yam, Plantain"
                        value={joinFormData.cargoType}
                        onChange={(e) => setJoinFormData({ ...joinFormData, cargoType: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        placeholder="Any special handling requirements..."
                        value={joinFormData.specialRequirements}
                        onChange={(e) => setJoinFormData({ ...joinFormData, specialRequirements: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      <Users className="w-4 h-4 mr-2" />
                      Join Group
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Safety Notice */}
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Safety Notice</h4>
                      <p className="text-sm text-yellow-700">
                        Always verify the organizer's identity and vehicle details before joining. Meet at public
                        locations and inform someone about your travel plans.
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
