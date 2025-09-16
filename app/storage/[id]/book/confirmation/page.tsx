"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Phone, Mail, Download, Share2, Home, Leaf } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BookingConfirmationPage() {
  const params = useParams()
  const storageId = params.id as string

  // Mock booking data - in real app, this would come from the booking process
  const bookingDetails = {
    bookingId: "HSB-2024-001234",
    status: "Confirmed",
    storage: {
      name: storageId === "1" ? "Kumasi Cold Storage" : "Ejisu Grain Store",
      type: storageId === "1" ? "Cold Storage" : "Dry Storage",
      location: storageId === "1" ? "Asokwa, Kumasi, Ashanti" : "Ejisu, Ashanti",
      owner: {
        name: storageId === "1" ? "Kwame Storage Ltd" : "Ama Grain Storage",
        phone: storageId === "1" ? "+233 24 123 4567" : "+233 24 234 5678",
        email: storageId === "1" ? "info@kwamestorage.com" : "contact@amagrains.com",
      },
    },
    booking: {
      cropType: "Tomatoes",
      quantity: "2000 kg",
      startDate: "December 20, 2024",
      endDate: "January 15, 2025",
      duration: "26 days",
      totalCost: "₵26,000.00",
      paymentMethod: "MTN Mobile Money",
      paymentStatus: "Pending",
    },
    farmer: {
      name: "John Mensah",
      phone: "+233 24 555 0123",
      location: "Ejisu, Ashanti",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="text-green-700 text-xl" />
            <span className="text-lg font-bold text-green-700">Harvest Sync</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600 text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Your storage space has been successfully reserved. You'll receive a confirmation SMS shortly.
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Booking Details</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Booking ID: {bookingDetails.bookingId}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">{bookingDetails.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Storage Information */}
              <div>
                <h4 className="font-semibold mb-3">Storage Facility</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium">{bookingDetails.storage.name}</h5>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {bookingDetails.storage.location}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {bookingDetails.storage.type}
                  </Badge>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h4 className="font-semibold mb-3">Booking Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Crop Type</span>
                      <p className="font-medium">{bookingDetails.booking.cropType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Quantity</span>
                      <p className="font-medium">{bookingDetails.booking.quantity}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Duration</span>
                      <p className="font-medium">{bookingDetails.booking.duration}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Start Date</span>
                      <p className="font-medium flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-600" />
                        {bookingDetails.booking.startDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">End Date</span>
                      <p className="font-medium flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-green-600" />
                        {bookingDetails.booking.endDate}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Total Cost</span>
                      <p className="font-bold text-green-600 text-lg">{bookingDetails.booking.totalCost}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h4 className="font-semibold mb-3">Payment Information</h4>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Payment Method: {bookingDetails.booking.paymentMethod}</p>
                      <p className="text-sm text-gray-600">Status: {bookingDetails.booking.paymentStatus}</p>
                    </div>
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      {bookingDetails.booking.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-amber-700 mt-2">
                    You'll receive payment instructions via SMS. Please complete payment within 24 hours to secure your
                    booking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Owner Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Storage Owner Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium">{bookingDetails.storage.owner.name}</h5>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">{bookingDetails.storage.owner.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">{bookingDetails.storage.owner.email}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Contact the owner directly for any questions about your booking or storage requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-medium">1. Complete Payment</h5>
                    <p className="text-sm text-gray-600">
                      Follow the payment instructions sent to your phone to secure your booking.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 text-gray-600 rounded-full p-1 mt-0.5">
                    <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-medium">2. Prepare Your Crops</h5>
                    <p className="text-sm text-gray-600">
                      Ensure your crops meet the storage facility's requirements and are properly prepared.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-100 text-gray-600 rounded-full p-1 mt-0.5">
                    <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-medium">3. Deliver Your Crops</h5>
                    <p className="text-sm text-gray-600">
                      Contact the storage owner to arrange delivery on your start date.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share Booking
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button className="bg-green-600 hover:bg-green-700 w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
