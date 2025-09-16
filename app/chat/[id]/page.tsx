"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Send, Phone, Video, MoreVertical, MapPin, Truck, Users, ArrowLeft, Leaf, User } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  sender: string
  message: string
  timestamp: string
  isCurrentUser: boolean
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Kwame Transport",
      message: "Welcome to the Kumasi to Accra transport group! We depart every Friday at 8:00 AM sharp.",
      timestamp: "10:30 AM",
      isCurrentUser: false,
    },
    {
      id: 2,
      sender: "Ama Serwaa",
      message: "Thank you! I'll be bringing tomatoes. What's the best way to package them?",
      timestamp: "10:32 AM",
      isCurrentUser: false,
    },
    {
      id: 3,
      sender: "Kwame Transport",
      message: "For tomatoes, use crates with good ventilation. We have temperature control in the truck.",
      timestamp: "10:35 AM",
      isCurrentUser: false,
    },
    {
      id: 4,
      sender: "You",
      message: "Hi everyone! I'm new to the group. What time should we arrive for loading?",
      timestamp: "10:40 AM",
      isCurrentUser: true,
    },
    {
      id: 5,
      sender: "Kofi Mensah",
      message: "Welcome! Usually 30 minutes before departure time is good. Kwame is very punctual 😊",
      timestamp: "10:42 AM",
      isCurrentUser: false,
    },
    {
      id: 6,
      sender: "Kwame Transport",
      message: "That's right! Please be there by 7:30 AM. We start loading immediately.",
      timestamp: "10:45 AM",
      isCurrentUser: false,
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mock data - in real app, fetch based on params.id
  const transportGroup = {
    id: 1,
    route: "Kumasi to Accra - Weekly",
    schedule: "Every Friday",
    departureTime: "8:00 AM",
    from: "Kumasi Central Market",
    to: "Accra Mall",
    vehicle: "5-ton Truck",
    spotsLeft: 3,
    totalSpots: 8,
    organizer: "Kwame Transport",
    nextDeparture: "Tomorrow",
  }

  const participants = [
    { name: "Kwame Transport", role: "Organizer", isOnline: true },
    { name: "Ama Serwaa", role: "Participant", isOnline: true },
    { name: "Kofi Mensah", role: "Participant", isOnline: false },
    { name: "Akosua Frimpong", role: "Participant", isOnline: true },
    { name: "You", role: "Participant", isOnline: true },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCurrentUser: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href={`/transport/${params.id}`}>
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
              <Link href={`/transport/${params.id}`}>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Back to Group</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="h-[600px] flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{transportGroup.route}</CardTitle>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Users className="w-4 h-4 mr-1" />
                        {participants.length} participants
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs lg:max-w-md ${msg.isCurrentUser ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            msg.isCurrentUser
                              ? "bg-green-600 text-white"
                              : "bg-white border border-gray-200 text-gray-900"
                          }`}
                        >
                          {!msg.isCurrentUser && (
                            <p className="text-xs font-medium mb-1 text-green-600">{msg.sender}</p>
                          )}
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.isCurrentUser ? "text-right" : "text-left"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                      <div className={`${msg.isCurrentUser ? "order-1 mr-2" : "order-2 ml-2"}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {msg.isCurrentUser ? "You" : <User className="w-4 h-4" />}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                <Separator />

                {/* Message Input */}
                <div className="p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Group Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Group Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-green-600 mr-2" />
                    <div>
                      <p className="font-medium">{transportGroup.from}</p>
                      <p className="text-gray-600">to {transportGroup.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Truck className="w-4 h-4 text-green-600 mr-2" />
                    <span>{transportGroup.vehicle}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 text-green-600 mr-2" />
                    <span>
                      {transportGroup.totalSpots - transportGroup.spotsLeft} of {transportGroup.totalSpots} spots filled
                    </span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    Next departure: {transportGroup.nextDeparture}
                  </Badge>
                </CardContent>
              </Card>

              {/* Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Participants ({participants.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            {participant.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{participant.name}</p>
                            <p className="text-xs text-gray-600">{participant.role}</p>
                          </div>
                        </div>
                        {participant.role === "Organizer" && (
                          <Badge variant="secondary" className="text-xs">
                            Admin
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href={`/transport/${params.id}`}>
                    <Button variant="outline" className="w-full text-sm justify-start">
                      <Truck className="w-4 h-4 mr-2" />
                      View Group Details
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full text-sm justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Share Location
                  </Button>
                  <Button variant="outline" className="w-full text-sm justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
