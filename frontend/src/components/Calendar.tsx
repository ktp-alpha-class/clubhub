"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import '@/app/globals.css';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { clubs } from "../app/shared/clubs";

interface Event {
  eventName: string;
  time: string;
  location: string;
  clubId: number;
};

const events: Event[] = [
  { eventName: 'Event1', time: '6:00 - 7:00', location: 'Snell', clubId: 1 },
  { eventName: 'Event2', time: '7:00 - 8:00', location: 'Shillman', clubId: 2 },
  { eventName: 'Event3', time: '8:00 - 9:30', location: 'Curry', clubId: 3 },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [selectedCalendars, setSelectedCalendars] = useState(['calendar one', 'calendar two']);
  const [followedClubs, setFollowedClubs] = useState<Set<number>>(new Set());

  // handles the user following/unfollowing a club
  const toggleFollow = (clubId: number) => {
    setFollowedClubs((prevFollowedClubs) => {
      const newFollowedClubs = new Set(prevFollowedClubs);
      if (newFollowedClubs.has(clubId)) {
        newFollowedClubs.delete(clubId);  // unfollow if already followed
      } else {
        newFollowedClubs.add(clubId);  // follow if not already followed
      }
      return newFollowedClubs;
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Calendar Sidebar */}
      <div className="w-64 border-r bg-background">
        <div className="flex h-full flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <h2 className="font-medium">Filter</h2>
          </div>
          <Separator />
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Clubs you follow</h3>
              <div className="space-y-2">
                {clubs.map((club) => (
                  followedClubs.has(club.id) && (
                    <div key={club.id} className="flex items-center space-x-2">
                      <Checkbox id={`club-${club.id}`} checked={true} disabled />
                      <Label htmlFor={`club-${club.id}`} className="text-sm font-normal">
                        {club.name}
                      </Label>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Find other clubs</h3>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search clubs" className="pl-8" />
              </div>

              <div className="space-y-2">
                {clubs.map((club) => (
                  <div key={club.id} className="flex items-center justify-between">
                    <span className="text-sm">{club.name}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleFollow(club.id)}
                    >
                      {followedClubs.has(club.id) ? "Unfollow" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Calendar Content */}
      <div className="flex-1 overflow-auto">
        <div className="h-full p-6">
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">My Calendar</h1>
              <div className="flex gap-2">
                {selectedCalendars.map((calendar) => (
                  <div
                    key={calendar}
                    className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                  >
                    {calendar}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {['Day', 'Week', 'Month'].map((view) => (
                  <Button
                    key={view}
                    variant={currentView === view ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentView(view as typeof currentView)}
                    className="text-xs"
                  >
                    {view}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(currentDate)
                    newDate.setDate(newDate.getDate() - 1)
                    setCurrentDate(newDate)
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newDate = new Date(currentDate)
                    newDate.setDate(newDate.getDate() + 1)
                    setCurrentDate(newDate)
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-2">
            {events.map((event, index) => (
              <Card key={index} className="p-4 hover:bg-accent">
                <h3 className="font-medium">{event.eventName}</h3>
                <p className="text-sm text-muted-foreground">{event.time}</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};