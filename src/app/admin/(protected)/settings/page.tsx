"use client";

import { useState, useTransition } from "react";
import { upsertSiteSetting } from "@/lib/actions/admin";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

const settingFields = [
  { key: "studio_name", label: "Studio Name", group: "general" },
  { key: "studio_tagline", label: "Tagline", group: "general" },
  { key: "studio_phone", label: "Phone", group: "contact" },
  { key: "studio_email", label: "Email", group: "contact" },
  { key: "studio_address", label: "Address", group: "contact" },
  { key: "whatsapp_number", label: "WhatsApp Number", group: "contact" },
  { key: "facebook_url", label: "Facebook URL", group: "social" },
  { key: "instagram_url", label: "Instagram URL", group: "social" },
  { key: "youtube_url", label: "YouTube URL", group: "social" },
  { key: "tiktok_url", label: "TikTok URL", group: "social" },
  { key: "meta_title", label: "Meta Title", group: "seo" },
  { key: "meta_description", label: "Meta Description", group: "seo" },
];

interface SettingField {
  key: string;
  label: string;
  group: string;
  value?: string;
}

function SettingRow({ field }: { field: SettingField }) {
  const [value, setValue] = useState(field.value || "");
  const [isPending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      await upsertSiteSetting(field.key, value, field.group);
      toast.success("Setting saved");
    });
  };

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <Label className="text-gray-700 text-sm">{field.label}</Label>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1"
          placeholder={field.key}
        />
      </div>
      <Button
        onClick={save}
        disabled={isPending}
        size="sm"
        className="bg-purple-600 hover:bg-purple-700 text-white border-0 h-9"
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Save className="w-3.5 h-3.5" />
        )}
      </Button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const groups = [...new Set(settingFields.map((f) => f.group))];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your studio information and site configuration
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-5 capitalize">
              {group}
            </h2>
            <div className="space-y-4">
              {settingFields
                .filter((f) => f.group === group)
                .map((field) => (
                  <SettingRow key={field.key} field={field} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
