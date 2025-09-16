"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Warehouse, User, MapPin, Phone, Eye, EyeOff, X, Leaf, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("type") === "storage" ? "storage" : "farmer")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [farmerData, setFarmerData] = useState({
    // Personal Information
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",

    // Location Information
    region: "",
    district: "",
    community: "",
    address: "",

    // Farm Information
    farmName: "",
    farmSize: "",
    primaryCrops: [] as string[],
    farmingExperience: "",
    farmingType: "",

    // Needs Assessment
    storageNeeds: [] as string[],
    transportNeeds: [] as string[],
    challenges: "",

    // Contact & Payment
    emergencyContact: "",
    mobileMoneyNumber: "",
    preferredLanguage: "",
    notifications: {
      sms: false,
      email: false,
      push: false,
    },
  })

  const [storageData, setStorageData] = useState({
    // Personal Information
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Business Information
    businessName: "",
    businessType: "",
    yearsInBusiness: "",
    businessRegistration: "",

    // Location Information
    region: "",
    district: "",
    community: "",
    address: "",

    // Storage Details
    storageTypes: [] as string[],
    totalCapacity: "",
    availableCapacity: "",
    priceRange: "",
    features: [] as string[],

    // Contact & Payment
    emergencyContact: "",
    mobileMoneyNumber: "",
    bankAccount: "",
    preferredLanguage: "",
  })

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

  const storageTypes = ["Cold Storage", "Dry Storage", "Grain Storage", "Warehouse", "Processing Facility"]

  const storageFeatures = [
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
  ]

  const storageNeeds = [
    "Short-term storage (1-7 days)",
    "Medium-term storage (1-4 weeks)",
    "Long-term storage (1+ months)",
    "Cold storage",
    "Dry storage",
    "Processing facilities",
  ]

  const transportNeeds = [
    "Local transport (within district)",
    "Regional transport (within region)",
    "Inter-regional transport",
    "Regular scheduled transport",
    "On-demand transport",
    "Temperature-controlled transport",
  ]

  const languages = ["English", "Twi", "Ewe", "Ga", "Hausa", "Dagbani"]

  // Update active tab when URL changes
  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "storage") {
      setActiveTab("storage")
    } else {
      setActiveTab("farmer")
    }
  }, [searchParams])

  const handleFarmerInputChange = (field: string, value: string | boolean | string[]) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFarmerData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFarmerData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleStorageInputChange = (field: string, value: string | string[]) => {
    setStorageData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addToArray = (data: any, setData: any, field: string, value: string) => {
    if (value && !data[field].includes(value)) {
      setData((prev: any) => ({
        ...prev,
        [field]: [...prev[field], value],
      }))
    }
  }

  const removeFromArray = (data: any, setData: any, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((item: string) => item !== value),
    }))
  }

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Farmer registration data:", farmerData)
    // Handle farmer registration
  }

  const handleStorageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Storage owner registration data:", storageData)
    // Handle storage owner registration
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
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
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Already have an account?</span>
                  <span className="sm:hidden">Login</span>
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
              <UserPlus className="text-green-700 text-2xl sm:text-3xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Join Harvest Sync</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Connect with Ghana's agricultural community. Choose your account type to get started.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="farmer" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>I'm a Farmer</span>
              </TabsTrigger>
              <TabsTrigger value="storage" className="flex items-center space-x-2">
                <Warehouse className="w-4 h-4" />
                <span>I Own Storage</span>
              </TabsTrigger>
            </TabsList>

            {/* Farmer Registration */}
            <TabsContent value="farmer">
              <form onSubmit={handleFarmerSubmit} className="space-y-8">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farmerFullName">Full Name *</Label>
                        <Input
                          id="farmerFullName"
                          placeholder="Your full name"
                          value={farmerData.fullName}
                          onChange={(e) => handleFarmerInputChange("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="farmerPhone">Phone Number *</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="farmerPhone"
                            type="tel"
                            placeholder="24 123 4567"
                            value={farmerData.phoneNumber}
                            onChange={(e) => handleFarmerInputChange("phoneNumber", e.target.value)}
                            className="rounded-l-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farmerEmail">Email Address</Label>
                        <Input
                          id="farmerEmail"
                          type="email"
                          placeholder="your.email@example.com"
                          value={farmerData.email}
                          onChange={(e) => handleFarmerInputChange("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="farmerGender">Gender</Label>
                        <Select
                          value={farmerData.gender}
                          onValueChange={(value) => handleFarmerInputChange("gender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farmerPassword">Password *</Label>
                        <div className="relative">
                          <Input
                            id="farmerPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={farmerData.password}
                            onChange={(e) => handleFarmerInputChange("password", e.target.value)}
                            className="pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="farmerConfirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="farmerConfirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={farmerData.confirmPassword}
                            onChange={(e) => handleFarmerInputChange("confirmPassword", e.target.value)}
                            className="pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="farmerRegion">Region *</Label>
                        <Select
                          value={farmerData.region}
                          onValueChange={(value) => handleFarmerInputChange("region", value)}
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="farmerDistrict">District *</Label>
                        <Select
                          value={farmerData.district}
                          onValueChange={(value) => handleFarmerInputChange("district", value)}
                          disabled={!farmerData.region}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {farmerData.region &&
                              districts[farmerData.region as keyof typeof districts]?.map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="farmerCommunity">Community/Town *</Label>
                        <Input
                          id="farmerCommunity"
                          placeholder="e.g., Ejisu"
                          value={farmerData.community}
                          onChange={(e) => handleFarmerInputChange("community", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="farmerAddress">Detailed Address</Label>
                      <Textarea
                        id="farmerAddress"
                        placeholder="Provide detailed directions to your location..."
                        value={farmerData.address}
                        onChange={(e) => handleFarmerInputChange("address", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Farm Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farmName">Farm Name</Label>
                        <Input
                          id="farmName"
                          placeholder="e.g., Kwame's Farm"
                          value={farmerData.farmName}
                          onChange={(e) => handleFarmerInputChange("farmName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="farmSize">Farm Size (acres)</Label>
                        <Input
                          id="farmSize"
                          type="number"
                          placeholder="e.g., 5"
                          value={farmerData.farmSize}
                          onChange={(e) => handleFarmerInputChange("farmSize", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farmingExperience">Years of Farming Experience</Label>
                        <Select
                          value={farmerData.farmingExperience}
                          onValueChange={(value) => handleFarmerInputChange("farmingExperience", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="11-20">11-20 years</SelectItem>
                            <SelectItem value="20+">20+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="farmingType">Farming Type</Label>
                        <Select
                          value={farmerData.farmingType}
                          onValueChange={(value) => handleFarmerInputChange("farmingType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select farming type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="subsistence">Subsistence Farming</SelectItem>
                            <SelectItem value="commercial">Commercial Farming</SelectItem>
                            <SelectItem value="mixed">Mixed Farming</SelectItem>
                            <SelectItem value="organic">Organic Farming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Primary Crops</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                        {commonCrops.map((crop) => (
                          <div key={crop} className="flex items-center space-x-2">
                            <Checkbox
                              id={`farmer-${crop}`}
                              checked={farmerData.primaryCrops.includes(crop)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray(farmerData, setFarmerData, "primaryCrops", crop)
                                } else {
                                  removeFromArray(farmerData, setFarmerData, "primaryCrops", crop)
                                }
                              }}
                            />
                            <Label htmlFor={`farmer-${crop}`} className="text-sm">
                              {crop}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {farmerData.primaryCrops.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Selected Crops</Label>
                          <div className="flex flex-wrap gap-2">
                            {farmerData.primaryCrops.map((crop) => (
                              <Badge key={crop} variant="secondary" className="text-sm">
                                {crop}
                                <button
                                  type="button"
                                  onClick={() => removeFromArray(farmerData, setFarmerData, "primaryCrops", crop)}
                                  className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Needs Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle>Needs Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Storage Needs</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {storageNeeds.map((need) => (
                          <div key={need} className="flex items-center space-x-2">
                            <Checkbox
                              id={`storage-${need}`}
                              checked={farmerData.storageNeeds.includes(need)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray(farmerData, setFarmerData, "storageNeeds", need)
                                } else {
                                  removeFromArray(farmerData, setFarmerData, "storageNeeds", need)
                                }
                              }}
                            />
                            <Label htmlFor={`storage-${need}`} className="text-sm">
                              {need}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {farmerData.storageNeeds.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {farmerData.storageNeeds.map((need) => (
                              <Badge key={need} variant="outline" className="text-sm">
                                {need}
                                <button
                                  type="button"
                                  onClick={() => removeFromArray(farmerData, setFarmerData, "storageNeeds", need)}
                                  className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Transport Needs</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {transportNeeds.map((need) => (
                          <div key={need} className="flex items-center space-x-2">
                            <Checkbox
                              id={`transport-${need}`}
                              checked={farmerData.transportNeeds.includes(need)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray(farmerData, setFarmerData, "transportNeeds", need)
                                } else {
                                  removeFromArray(farmerData, setFarmerData, "transportNeeds", need)
                                }
                              }}
                            />
                            <Label htmlFor={`transport-${need}`} className="text-sm">
                              {need}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {farmerData.transportNeeds.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {farmerData.transportNeeds.map((need) => (
                              <Badge key={need} variant="outline" className="text-sm">
                                {need}
                                <button
                                  type="button"
                                  onClick={() => removeFromArray(farmerData, setFarmerData, "transportNeeds", need)}
                                  className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="challenges">Main Challenges (Optional)</Label>
                      <Textarea
                        id="challenges"
                        placeholder="Describe your main farming or post-harvest challenges..."
                        value={farmerData.challenges}
                        onChange={(e) => handleFarmerInputChange("challenges", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Contact & Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Contact & Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="farmerEmergencyContact">Emergency Contact</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="farmerEmergencyContact"
                            type="tel"
                            placeholder="24 987 6543"
                            value={farmerData.emergencyContact}
                            onChange={(e) => handleFarmerInputChange("emergencyContact", e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="farmerMobileMoney">Mobile Money Number</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="farmerMobileMoney"
                            type="tel"
                            placeholder="24 123 4567"
                            value={farmerData.mobileMoneyNumber}
                            onChange={(e) => handleFarmerInputChange("mobileMoneyNumber", e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="farmerLanguage">Preferred Language</Label>
                      <Select
                        value={farmerData.preferredLanguage}
                        onValueChange={(value) => handleFarmerInputChange("preferredLanguage", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language.toLowerCase()}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Notification Preferences</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="farmerSmsNotifications"
                            checked={farmerData.notifications.sms}
                            onCheckedChange={(checked) =>
                              handleFarmerInputChange("notifications.sms", checked as boolean)
                            }
                          />
                          <Label htmlFor="farmerSmsNotifications" className="text-sm">
                            SMS notifications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="farmerEmailNotifications"
                            checked={farmerData.notifications.email}
                            onCheckedChange={(checked) =>
                              handleFarmerInputChange("notifications.email", checked as boolean)
                            }
                          />
                          <Label htmlFor="farmerEmailNotifications" className="text-sm">
                            Email notifications
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="farmerPushNotifications"
                            checked={farmerData.notifications.push}
                            onCheckedChange={(checked) =>
                              handleFarmerInputChange("notifications.push", checked as boolean)
                            }
                          />
                          <Label htmlFor="farmerPushNotifications" className="text-sm">
                            Push notifications
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="farmerTerms" required />
                      <div className="text-sm">
                        <Label htmlFor="farmerTerms" className="font-medium">
                          I agree to the Terms and Conditions *
                        </Label>
                        <p className="text-gray-600 mt-1">
                          By creating an account, you agree to our{" "}
                          <Link href="/terms" className="text-green-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Farmer Account
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Storage Owner Registration */}
            <TabsContent value="storage">
              <form onSubmit={handleStorageSubmit} className="space-y-8">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="storageFullName">Full Name *</Label>
                        <Input
                          id="storageFullName"
                          placeholder="Your full name"
                          value={storageData.fullName}
                          onChange={(e) => handleStorageInputChange("fullName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="storagePhone">Phone Number *</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="storagePhone"
                            type="tel"
                            placeholder="24 123 4567"
                            value={storageData.phoneNumber}
                            onChange={(e) => handleStorageInputChange("phoneNumber", e.target.value)}
                            className="rounded-l-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="storageEmail">Email Address</Label>
                      <Input
                        id="storageEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={storageData.email}
                        onChange={(e) => handleStorageInputChange("email", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="storagePassword">Password *</Label>
                        <div className="relative">
                          <Input
                            id="storagePassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={storageData.password}
                            onChange={(e) => handleStorageInputChange("password", e.target.value)}
                            className="pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="storageConfirmPassword">Confirm Password *</Label>
                        <div className="relative">
                          <Input
                            id="storageConfirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={storageData.confirmPassword}
                            onChange={(e) => handleStorageInputChange("confirmPassword", e.target.value)}
                            className="pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Warehouse className="w-5 h-5 mr-2" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="e.g., Kumasi Storage Solutions"
                          value={storageData.businessName}
                          onChange={(e) => handleStorageInputChange("businessName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">Business Type</Label>
                        <Select
                          value={storageData.businessType}
                          onValueChange={(value) => handleStorageInputChange("businessType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual Owner</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="company">Limited Company</SelectItem>
                            <SelectItem value="cooperative">Cooperative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="yearsInBusiness">Years in Business</Label>
                        <Select
                          value={storageData.yearsInBusiness}
                          onValueChange={(value) => handleStorageInputChange("yearsInBusiness", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="businessRegistration">Business Registration Number</Label>
                        <Input
                          id="businessRegistration"
                          placeholder="Registration number (if applicable)"
                          value={storageData.businessRegistration}
                          onChange={(e) => handleStorageInputChange("businessRegistration", e.target.value)}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="storageRegion">Region *</Label>
                        <Select
                          value={storageData.region}
                          onValueChange={(value) => handleStorageInputChange("region", value)}
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="storageDistrict">District *</Label>
                        <Select
                          value={storageData.district}
                          onValueChange={(value) => handleStorageInputChange("district", value)}
                          disabled={!storageData.region}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {storageData.region &&
                              districts[storageData.region as keyof typeof districts]?.map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="storageCommunity">Community/Town *</Label>
                        <Input
                          id="storageCommunity"
                          placeholder="e.g., Asokwa"
                          value={storageData.community}
                          onChange={(e) => handleStorageInputChange("community", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="storageAddress">Detailed Address *</Label>
                      <Textarea
                        id="storageAddress"
                        placeholder="Provide detailed directions to your storage facility..."
                        value={storageData.address}
                        onChange={(e) => handleStorageInputChange("address", e.target.value)}
                        rows={3}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Storage Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Storage Types Available</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {storageTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`storage-type-${type}`}
                              checked={storageData.storageTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray(storageData, setStorageData, "storageTypes", type)
                                } else {
                                  removeFromArray(storageData, setStorageData, "storageTypes", type)
                                }
                              }}
                            />
                            <Label htmlFor={`storage-type-${type}`} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {storageData.storageTypes.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {storageData.storageTypes.map((type) => (
                              <Badge key={type} variant="secondary" className="text-sm">
                                {type}
                                <button
                                  type="button"
                                  onClick={() => removeFromArray(storageData, setStorageData, "storageTypes", type)}
                                  className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="totalCapacity">Total Capacity (kg) *</Label>
                        <Input
                          id="totalCapacity"
                          type="number"
                          placeholder="e.g., 10000"
                          value={storageData.totalCapacity}
                          onChange={(e) => handleStorageInputChange("totalCapacity", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="availableCapacity">Currently Available (kg)</Label>
                        <Input
                          id="availableCapacity"
                          type="number"
                          placeholder="e.g., 8000"
                          value={storageData.availableCapacity}
                          onChange={(e) => handleStorageInputChange("availableCapacity", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="priceRange">Price Range (₵/kg/day)</Label>
                        <Input
                          id="priceRange"
                          placeholder="e.g., 0.30 - 0.50"
                          value={storageData.priceRange}
                          onChange={(e) => handleStorageInputChange("priceRange", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Available Features</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {storageFeatures.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`storage-feature-${feature}`}
                              checked={storageData.features.includes(feature)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addToArray(storageData, setStorageData, "features", feature)
                                } else {
                                  removeFromArray(storageData, setStorageData, "features", feature)
                                }
                              }}
                            />
                            <Label htmlFor={`storage-feature-${feature}`} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {storageData.features.length > 0 && (
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {storageData.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-sm">
                                {feature}
                                <button
                                  type="button"
                                  onClick={() => removeFromArray(storageData, setStorageData, "features", feature)}
                                  className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact & Payment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Contact & Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="storageEmergencyContact">Emergency Contact</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="storageEmergencyContact"
                            type="tel"
                            placeholder="24 987 6543"
                            value={storageData.emergencyContact}
                            onChange={(e) => handleStorageInputChange("emergencyContact", e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="storageMobileMoney">Mobile Money Number</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="storageMobileMoney"
                            type="tel"
                            placeholder="24 123 4567"
                            value={storageData.mobileMoneyNumber}
                            onChange={(e) => handleStorageInputChange("mobileMoneyNumber", e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="storageBankAccount">Bank Account Number</Label>
                        <Input
                          id="storageBankAccount"
                          placeholder="Account number (optional)"
                          value={storageData.bankAccount}
                          onChange={(e) => handleStorageInputChange("bankAccount", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="storageLanguage">Preferred Language</Label>
                        <Select
                          value={storageData.preferredLanguage}
                          onValueChange={(value) => handleStorageInputChange("preferredLanguage", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem key={language} value={language.toLowerCase()}>
                                {language}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="storageTerms" required />
                      <div className="text-sm">
                        <Label htmlFor="storageTerms" className="font-medium">
                          I agree to the Terms and Conditions *
                        </Label>
                        <p className="text-gray-600 mt-1">
                          By creating an account, you agree to our{" "}
                          <Link href="/terms" className="text-green-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:underline">
                            Privacy Policy
                          </Link>
                          . You also agree to provide accurate information about your storage facilities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
                    <Warehouse className="w-4 h-4 mr-2" />
                    Create Storage Owner Account
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-green-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
