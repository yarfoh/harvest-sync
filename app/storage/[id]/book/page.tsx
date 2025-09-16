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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, CalendarIcon, CreditCard, Leaf, AlertCircle, Calculator } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { format } from "date-fns"

export default function BookStoragePage() {
  const params = useParams()
  const router = useRouter()
  const storageId = params.id as string

  const [bookingData, setBookingData] = useState({
    cropType: "",
    quantity: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    farmerName: "",
    phoneNumber: "",
    email: "",
    farmLocation: "",
    specialRequirements: "",
    paymentMethod: "",
    mobileMoneyNumber: "",
    emergencyContact: "",
  })

  const [showCalendar, setShowCalendar] = useState<"start" | "end" | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock storage data
  const storageData = {
    "1": {
      name: "Kumasi Cold Storage",
      price: 0.5,
      type: "Cold Storage",
      acceptedCrops: ["Tomatoes", "Onions", "Pepper", "Cabbage", "Lettuce", "Carrots"],
    },
    "2": {
      name: "Ejisu Grain Store",
      price: 0.3,
      type: "Dry Storage",
      acceptedCrops: ["Maize", "Rice", "Beans", "Groundnuts", "Millet", "Sorghum"],
    },
  }

  const storage = storageData[storageId as keyof typeof storageData]

  const calculateTotal = () => {
    if (!bookingData.quantity || !bookingData.startDate || !bookingData.endDate) return 0
    const days = Math.ceil((bookingData.endDate.getTime() - bookingData.startDate.getTime()) / (1000 * 60 * 60 * 24))
    return Number.parseFloat(bookingData.quantity) * storage.price * days
  }

  const calculateDays = () => {
    if (!bookingData.startDate || !bookingData.endDate) return 0
    return Math.ceil((bookingData.endDate.getTime() - bookingData.startDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDateSelect = (date: Date | undefined, type: "start" | "end") => {
    setBookingData((prev) => ({
      ...prev,
      [type === "start" ? "startDate" : "endDate"]: date,
    }))
    setShowCalendar(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    // In a real app, this would submit to an API
    console.log("Booking data:", bookingData)

    // Redirect to confirmation page
    router.push(`/storage/${storageId}/book/confirmation`)
  }

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
            <Link href={`/storage/${storageId}`}>
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Book Storage Space</h1>
            <p className="text-gray-600">Complete the form below to reserve space at {storage.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Crop Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Crop Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cropType">Crop Type *</Label>
                        <Select
                          value={bookingData.cropType}
                          onValueChange={(value) => handleInputChange("cropType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop type" />
                          </SelectTrigger>
                          <SelectContent>
                            {storage.acceptedCrops.map((crop) => (
                              <SelectItem key={crop} value={crop}>
                                {crop}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity (kg) *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          placeholder="e.g., 1000"
                          value={bookingData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date *</Label>
                        <Popover
                          open={showCalendar === "start"}
                          onOpenChange={(open) => setShowCalendar(open ? "start" : null)}
                        >
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingData.startDate ? format(bookingData.startDate, "PPP") : "Select start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={bookingData.startDate}
                              onSelect={(date) => handleDateSelect(date, "start")}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>End Date *</Label>
                        <Popover
                          open={showCalendar === "end"}
                          onOpenChange={(open) => setShowCalendar(open ? "end" : null)}
                        >
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {bookingData.endDate ? format(bookingData.endDate, "PPP") : "Select end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={bookingData.endDate}
                              onSelect={(date) => handleDateSelect(date, "end")}
                              disabled={(date) => date < (bookingData.startDate || new Date())}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        placeholder="Any special handling or storage requirements..."
                        value={bookingData.specialRequirements}
                        onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Farmer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="farmerName">Full Name *</Label>
                        <Input
                          id="farmerName"
                          placeholder="Your full name"
                          value={bookingData.farmerName}
                          onChange={(e) => handleInputChange("farmerName", e.target.value)}
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
                            value={bookingData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            className="rounded-l-none"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="farmLocation">Farm Location *</Label>
                        <Input
                          id="farmLocation"
                          placeholder="e.g., Ejisu, Ashanti"
                          value={bookingData.farmLocation}
                          onChange={(e) => handleInputChange("farmLocation", e.target.value)}
                          required
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
                          value={bookingData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Select Payment Method *</Label>
                      <Select
                        value={bookingData.paymentMethod}
                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mtn-momo">MTN Mobile Money</SelectItem>
                          <SelectItem value="vodafone-cash">Vodafone Cash</SelectItem>
                          <SelectItem value="airteltigo-money">AirtelTigo Money</SelectItem>
                          <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {bookingData.paymentMethod && bookingData.paymentMethod !== "bank-transfer" && (
                      <div>
                        <Label htmlFor="mobileMoneyNumber">Mobile Money Number *</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            +233
                          </span>
                          <Input
                            id="mobileMoneyNumber"
                            type="tel"
                            placeholder="24 123 4567"
                            value={bookingData.mobileMoneyNumber}
                            onChange={(e) => handleInputChange("mobileMoneyNumber", e.target.value)}
                            className="rounded-l-none"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />
                      <div className="text-sm">
                        <Label htmlFor="terms" className="font-medium">
                          I agree to the Terms and Conditions *
                        </Label>
                        <p className="text-gray-600 mt-1">
                          By booking this storage space, you agree to our{" "}
                          <Link href="/terms" className="text-green-600 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:underline">
                            Privacy Policy
                          </Link>
                          . You also agree to the storage facility's terms and conditions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button type="button" variant="outline" className="w-full sm:w-auto">
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                    disabled={!agreedToTerms}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">{storage.name}</h4>
                      <p className="text-sm text-gray-600">{storage.type}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Crop Type:</span>
                        <span>{bookingData.cropType || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span>{bookingData.quantity ? `${bookingData.quantity} kg` : "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{calculateDays() > 0 ? `${calculateDays()} days` : "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span>₵{storage.price}/kg/day</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Cost:</span>
                        <span className="text-xl font-bold text-green-600">₵{calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    {calculateTotal() > 0 && (
                      <div className="text-xs text-gray-500">
                        * Final amount may vary based on actual storage duration
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Safety Notice */}
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-2">Important Notice</h4>
                        <ul className="text-sm text-amber-700 space-y-1">
                          <li>• Inspect your crops before storage</li>
                          <li>• Follow facility guidelines</li>
                          <li>• Keep your booking receipt</li>
                          <li>• Contact owner for any issues</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
