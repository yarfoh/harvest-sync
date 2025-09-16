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
import {
  Warehouse,
  MapPin,
  Upload,
  Plus,
  X,
  Thermometer,
  Wind,
  Shield,
  Camera,
  Leaf,
  Phone,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function StorageRegisterPage() {
  const [formData, setFormData] = useState({
    facilityName: "",
    ownerName: "",
    phoneNumber: "",
    email: "",
    region: "",
    district: "",
    community: "",
    address: "",
    storageType: "",
    capacity: "",
    pricePerKgPerDay: "",
    description: "",
    features: [] as string[],
    crops: [] as string[],
    operatingHours: {
      open: "",
      close: "",
    },
    emergencyContact: "",
    bankAccount: "",
    mobileMoneyNumber: "",
  })

  const [images, setImages] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [newCrop, setNewCrop] = useState("")

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

  const districts = {
    Ashanti: ["Kumasi Metro", "Ejisu-Juaben", "Atwima Nwabiagya", "Bosomtwe", "Adansi North"],
    "Greater Accra": ["Accra Metro", "Tema", "Ga East", "Ga West", "Ledzokuku-Krowor"],
    Northern: ["Tamale Metro", "Sagnarigu", "Tolon", "Kumbungu", "Savelugu"],
  }

  const commonFeatures = [
    "Temperature Control",
    "Humidity Control",
    "Security System",
    "24/7 Access",
    "Loading Bay",
    "Pest Control",
    "Ventilation",
    "Fire Safety",
    "CCTV Monitoring",
    "Weighing Scale",
    "Sorting Area",
    "Packaging Area",
  ]

  const commonCrops = [
    "Maize",
    "Rice",
    "Yam",
    "Cassava",
    "Plantain",
    "Cocoa",
    "Tomatoes",
    "Onions",
    "Pepper",
    "Okra",
    "Garden Eggs",
    "Cabbage",
    "Lettuce",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOperatingHoursChange = (field: "open" | "close", value: string) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [field]: value,
      },
    }))
  }

  const addFeature = (feature: string) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }))
    }
    setNewFeature("")
  }

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
  }

  const addCrop = (crop: string) => {
    if (crop && !formData.crops.includes(crop)) {
      setFormData((prev) => ({
        ...prev,
        crops: [...prev.crops, crop],
      }))
    }
    setNewCrop("")
  }

  const removeCrop = (crop: string) => {
    setFormData((prev) => ({
      ...prev,
      crops: prev.crops.filter((c) => c !== crop),
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // In a real app, you'd upload these to a server
      // For now, we'll just create placeholder URLs
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=200&width=300&text=Storage+Image+${images.length + index + 1}`,
      )
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Storage registration data:", { ...formData, images })
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/storage">
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
              <Link href="/storage">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Back to Storage</span>
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
              <Warehouse className="text-green-700 text-2xl sm:text-3xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Register Your Storage Facility</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Join our network of storage providers and help farmers across Ghana store their harvest safely. Fill out
              the form below to list your facility.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Warehouse className="w-5 h-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="facilityName" className="text-sm sm:text-base">
                      Facility Name *
                    </Label>
                    <Input
                      id="facilityName"
                      placeholder="e.g., Kumasi Cold Storage"
                      value={formData.facilityName}
                      onChange={(e) => handleInputChange("facilityName", e.target.value)}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName" className="text-sm sm:text-base">
                      Owner/Manager Name *
                    </Label>
                    <Input
                      id="ownerName"
                      placeholder="Your full name"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="region" className="text-sm sm:text-base">
                      Region *
                    </Label>
                    <Select value={formData.region} onValueChange={(value) => handleInputChange("region", value)}>
                      <SelectTrigger className="text-sm sm:text-base">
                        <SelectValue placeholder="Select region" />
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
                    <Label htmlFor="district" className="text-sm sm:text-base">
                      District *
                    </Label>
                    <Select
                      value={formData.district}
                      onValueChange={(value) => handleInputChange("district", value)}
                      disabled={!formData.region}
                    >
                      <SelectTrigger className="text-sm sm:text-base">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.region &&
                          districts[formData.region as keyof typeof districts]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <Label htmlFor="community" className="text-sm sm:text-base">
                      Community/Town *
                    </Label>
                    <Input
                      id="community"
                      placeholder="e.g., Asokwa"
                      value={formData.community}
                      onChange={(e) => handleInputChange("community", e.target.value)}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Detailed Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Provide detailed directions to your storage facility..."
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Storage Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Storage Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="storageType">Storage Type *</Label>
                    <Select
                      value={formData.storageType}
                      onValueChange={(value) => handleInputChange("storageType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cold Storage">
                          <div className="flex items-center">
                            <Thermometer className="w-4 h-4 mr-2" />
                            Cold Storage
                          </div>
                        </SelectItem>
                        <SelectItem value="Dry Storage">
                          <div className="flex items-center">
                            <Wind className="w-4 h-4 mr-2" />
                            Dry Storage
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="capacity">Total Capacity (kg) *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="e.g., 5000"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange("capacity", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pricePerKgPerDay">Price (₵/kg/day) *</Label>
                    <Input
                      id="pricePerKgPerDay"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 0.50"
                      value={formData.pricePerKgPerDay}
                      onChange={(e) => handleInputChange("pricePerKgPerDay", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Facility Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your storage facility, its condition, and any special features..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Operating Hours */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Operating Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="openTime">Opening Time</Label>
                      <Input
                        id="openTime"
                        type="time"
                        value={formData.operatingHours.open}
                        onChange={(e) => handleOperatingHoursChange("open", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="closeTime">Closing Time</Label>
                      <Input
                        id="closeTime"
                        type="time"
                        value={formData.operatingHours.close}
                        onChange={(e) => handleOperatingHoursChange("close", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Facility Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Available Features</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4">
                    {commonFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={formData.features.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addFeature(feature)
                            } else {
                              removeFeature(feature)
                            }
                          }}
                        />
                        <Label htmlFor={feature} className="text-xs sm:text-sm">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customFeature">Add Custom Feature</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="customFeature"
                      placeholder="Enter custom feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                    />
                    <Button type="button" onClick={() => addFeature(newFeature)} disabled={!newFeature}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.features.length > 0 && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Selected Features</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs sm:text-sm">
                          {feature}
                          <button
                            type="button"
                            onClick={() => removeFeature(feature)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Accepted Crops */}
            <Card>
              <CardHeader>
                <CardTitle>Accepted Crops</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Crops You Can Store</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
                    {commonCrops.map((crop) => (
                      <div key={crop} className="flex items-center space-x-2">
                        <Checkbox
                          id={crop}
                          checked={formData.crops.includes(crop)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              addCrop(crop)
                            } else {
                              removeCrop(crop)
                            }
                          }}
                        />
                        <Label htmlFor={crop} className="text-xs sm:text-sm">
                          {crop}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customCrop">Add Other Crop</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="customCrop"
                      placeholder="Enter crop name"
                      value={newCrop}
                      onChange={(e) => setNewCrop(e.target.value)}
                    />
                    <Button type="button" onClick={() => addCrop(newCrop)} disabled={!newCrop}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {formData.crops.length > 0 && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Accepted Crops</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.crops.map((crop) => (
                        <Badge key={crop} variant="outline" className="text-xs sm:text-sm">
                          {crop}
                          <button
                            type="button"
                            onClick={() => removeCrop(crop)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Facility Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="photos" className="text-base font-medium mb-3 block">
                    Upload Photos of Your Facility
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    Add photos to help farmers see your storage facility. Include exterior, interior, and equipment
                    photos.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="photos" className="cursor-pointer">
                      <span className="text-green-600 font-medium">Click to upload photos</span>
                      <span className="text-gray-600"> or drag and drop</span>
                    </Label>
                    <Input
                      id="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>

                {images.length > 0 && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Uploaded Photos</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Storage facility ${index + 1}`}
                            width={200}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="mobileMoneyNumber">Mobile Money Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +233
                      </span>
                      <Input
                        id="mobileMoneyNumber"
                        type="tel"
                        placeholder="24 123 4567"
                        value={formData.mobileMoneyNumber}
                        onChange={(e) => handleInputChange("mobileMoneyNumber", e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bankAccount">Bank Account Number (Optional)</Label>
                    <Input
                      id="bankAccount"
                      placeholder="Account number"
                      value={formData.bankAccount}
                      onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                    />
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
                      By registering your storage facility, you agree to our{" "}
                      <Link href="/terms" className="text-green-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-green-600 hover:underline">
                        Privacy Policy
                      </Link>
                      . You also agree to provide accurate information and maintain your facility according to safety
                      standards.
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
                <Warehouse className="w-4 h-4 mr-2" />
                Register Storage Facility
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
