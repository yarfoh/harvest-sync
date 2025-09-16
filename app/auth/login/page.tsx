"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Leaf, Phone, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login data:", formData)
    // Handle login logic
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
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
              <Link href="/">
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center pb-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-green-700 text-2xl" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">Welcome Back</CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">Sign in to your Harvest Sync account</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Login Method Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === "phone" ? "bg-white text-green-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === "email" ? "bg-white text-green-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Phone/Email Input */}
                {loginMethod === "phone" ? (
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +233
                      </span>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="24 123 4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Password Input */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Sign In
                </Button>
              </form>

              <Separator />

              {/* Alternative Login Methods */}
              <div className="space-y-3">
                <p className="text-center text-sm text-gray-600">Or continue with</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    USSD
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    SMS
                  </Button>
                </div>
              </div>

              {/* Registration Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-green-600 hover:underline font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/help" className="text-green-600 hover:underline">
                Help Center
              </Link>
              <Link href="/contact" className="text-green-600 hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
