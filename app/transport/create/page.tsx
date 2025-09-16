"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Truck, MapPin, Calendar, Users, ArrowLeft, Leaf, Plus } from "lucide-react"
import Link from "next/link"

export default function CreateTransportPage() {
  const [formData, setFormData] = useState({
    routeName: "",
    fromLocation: "",
    fromAddress: "",
    toLocation: "",
    toAddress: "",
    departureDate: "",
    departureTime: "",
    vehicleType: "",
    vehicleCapacity: "",
    pricePerUnit: "",
    maxParticipants: "",
    description: "",
    organizerName: "",
    phoneNumber: "",
    emergencyContact: "",
    isRecurring: false,
    recurringPattern: "",
    specialRequirements: [] as string[],
  })

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

  const vehicleTypes = [
    "Small Truck (3-5 tons)",
    "Medium Truck (5-8 tons)",
    "Large Truck (8+ tons)",
    "Pickup Truck",
    "Van",
    "Refrigerated Truck",
  ]

  const recurringPatterns = ["Daily", "Weekly", "Bi-weekly", "Monthly"]

  const specialRequirements = [
    "Temperature Control",
    "Fragile Goods Handling",
    "Quick Loading/Unloading",
    "Multiple Stops",
    "Insurance Coverage",
    "GPS Tracking",
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const toggleSpecialRequirement = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      specialRequirements: prev.specialRequirements.includes(requirement)
        ? prev.specialRequirements.filter((r) => r !== requirement)
        : [...prev.specialRequirements, requirement],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Transport group data:", formData)
    // Handle form submission
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="text-green-700 text-2xl sm:text-3xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Transport Group</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Organize a transport group to share costs with other farmers. Fill out the details below to create your
              group.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Route Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Route Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="routeName" className="text-sm sm:text-base">
                    Route Name *
                  </Label>
                  <Input
                    id="routeName"
                    placeholder="e.g., Kumasi to Accra - Weekly"
                    value={formData.routeName}
                    onChange={(e) => handleInputChange("routeName", e.target.value)}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-base">From Location</h3>
                    <div>
                      <Label htmlFor="fromLocation">City/Town *</Label>
                      <Select
                        value={formData.fromLocation}
                        onValueChange={(value) => handleInputChange("fromLocation", value)}
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="fromAddress">Specific Address/Landmark *</Label>
                      <Textarea
                        id="fromAddress"
                        placeholder="e.g., Kumasi Central Market, Near the main gate"
                        value={formData.fromAddress}
                        onChange={(e) => handleInputChange("fromAddress", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-base">To Location</h3>
                    <div>
                      <Label htmlFor="toLocation">City/Town *</Label>
                      <Select
                        value={formData.toLocation}
                        onValueChange={(value) => handleInputChange("toLocation", value)}
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="toAddress">Specific Address/Landmark *</Label>
                      <Textarea
                        id="toAddress"
                        placeholder="e.g., Accra Mall, Main parking area"
                        value={formData.toAddress}
                        onChange={(e) => handleInputChange("toAddress", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="departureDate">Departure Date *</Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => handleInputChange("departureDate", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="departureTime">Departure Time *</Label>
                    <Input
                      id="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={(e) => handleInputChange("departureTime", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isRecurring"
                    checked={formData.isRecurring}
                    onCheckedChange={(checked) => handleInputChange("isRecurring", checked as boolean)}
                  />
                  <Label htmlFor="isRecurring">This is a recurring transport group</Label>
                </div>

                {formData.isRecurring && (
                  <div>
                    <Label htmlFor="recurringPattern">Recurring Pattern</Label>
                    <Select
                      value={formData.recurringPattern}
                      onValueChange={(value) => handleInputChange("recurringPattern", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        {recurringPatterns.map((pattern) => (
                          <SelectItem key={pattern} value={pattern}>
                            {pattern}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type *</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => handleInputChange("vehicleType", value)}
                    >
                      <SelectTrigger>
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
                  <div>
                    <Label htmlFor="vehicleCapacity">Vehicle Capacity (kg) *</Label>
                    <Input
                      id="vehicleCapacity"
                      type="number"
                      placeholder="e.g., 5000"
                      value={formData.vehicleCapacity}
                      onChange={(e) => handleInputChange("vehicleCapacity", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerUnit">Price per 100kg (₵) *</Label>
                    <Input
                      id="pricePerUnit"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.pricePerUnit}
                      onChange={(e) => handleInputChange("pricePerUnit", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxParticipants">Maximum Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="e.g., 8"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                    required
                    className="max-w-xs"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    How many farmers can join this transport group (including yourself)?
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Special Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Special Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select any special requirements</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {specialRequirements.map((requirement) => (
                      <div key={requirement} className="flex items-center space-x-2">
                        <Checkbox
                          id={requirement}
                          checked={formData.specialRequirements.includes(requirement)}
                          onCheckedChange={() => toggleSpecialRequirement(requirement)}
                        />
                        <Label htmlFor={requirement} className="text-sm">
                          {requirement}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.specialRequirements.length > 0 && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Selected Requirements</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialRequirements.map((requirement) => (
                        <Badge key={requirement} variant="secondary" className="text-sm">
                          {requirement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="description">Additional Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide any additional details about the transport, route conditions, or special instructions..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Organizer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Organizer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organizerName">Your Name *</Label>
                    <Input
                      id="organizerName"
                      placeholder="Your full name"
                      value={formData.organizerName}
                      onChange={(e) => handleInputChange("organizerName", e.target.value)}
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
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +233
                    </span>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      placeholder="24 987 6543"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Alternative contact number in case of emergencies during transport
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" required />
                  <div className="text-sm">
                    <Label htmlFor="terms" className="font-medium">
                      I agree to the Terms and Conditions *
                    </Label>
                    <p className="text-gray-600 mt-1">
                      By creating a transport group, you agree to our{" "}
                      <Link href="/terms" className="text-green-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-green-600 hover:underline">
                        Privacy Policy
                      </Link>
                      . You are responsible for coordinating the transport and ensuring all participants are informed of
                      the schedule and requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Save as Draft
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Transport Group
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
