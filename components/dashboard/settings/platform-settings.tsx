"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Check, ExternalLink } from "lucide-react";

const platforms = [
  {
    name: "eBay",
    connected: true,
    status: "active",
    lastSync: "2 minutes ago",
  },
  {
    name: "Mercari",
    connected: true,
    status: "active",
    lastSync: "5 minutes ago",
  },
  {
    name: "Poshmark",
    connected: false,
    status: "disconnected",
    lastSync: "Never",
  },
  {
    name: "Etsy",
    connected: false,
    status: "disconnected",
    lastSync: "Never",
  },
];

export function PlatformSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Platforms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex flex-1 items-center space-x-4">
                <div>
                  <p className="text-sm font-medium leading-none">
                    {platform.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {platform.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {platform.connected ? (
                  <>
                    <Badge variant="success" className="flex items-center">
                      <Check className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                    <Switch checked={platform.status === "active"} />
                  </>
                ) : (
                  <Button variant="outline" size="sm">
                    Connect
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <div className="mt-6 rounded-lg border border-dashed p-4">
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Need more platforms?</p>
                <p className="text-sm text-muted-foreground">
                  We're constantly adding new platforms. Let us know which ones
                  you'd like to see.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Request Platform
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
