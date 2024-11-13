import React from 'react';
import Layout from '../../components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { clubs } from '../../app/shared/clubs';

import '@/app/globals.css';

const Profile: React.FC = () => {
  return (
    <Layout>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="grid md:grid-cols-[1fr,300px] gap-6">
          <div className="space-y-6">
            {/* Personal Info */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Info</h2>
              <div className="flex gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-muted" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Nick Byrne</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">Computer Science</Badge>
                    <Badge variant="secondary">Undergrad</Badge>
                    <Badge variant="secondary">Senior</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Insert bio here insert bio here insert bio here insert bio here insert bio here
                  </p>
                </div>
              </div>
            </section>

            {/* My Clubs */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">My clubs</h2>
              <div className="space-y-3">
                {clubs.map((club) => (
                  <Card key={club.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{club.name}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">badge</Badge>
                          <Badge variant="secondary">badge</Badge>
                          <Badge variant="secondary">badge</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* My Applications */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">My applications</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((app) => (
                  <Card key={app} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted" />
                      <div className="flex-1">
                        <h3 className="font-semibold">Club name</h3>
                        <p className="text-sm text-muted-foreground">Application position</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Clubs I Follow */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Clubs I follow</h2>
              <Button variant="ghost" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((club) => (
                <Card key={club} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted" />
                      <div className="flex-1">
                        <h3 className="font-semibold">Club name</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="secondary">badge</Badge>
                          <Badge variant="secondary">badge</Badge>
                          <Badge variant="secondary">badge</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Short two sentence description Short two sentence description Short two
                      sentence description Short two sentence description
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;