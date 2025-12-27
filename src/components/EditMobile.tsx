"use client";

import { Phone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditRoleMobile() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (mobile.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/user/add-mobile", { mobile });
      toast.success("Mobile number saved successfully");
      router.refresh();
      router.push(callbackUrl);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to save mobile number"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-emerald-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur-xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] border border-white/60"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <Phone className="h-6 w-6 text-green-600" />
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">
            Complete your profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add your mobile number to continue
          </p>
        </div>

        {/* Mobile input */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Mobile number
          </label>
          <input
            type="text"
            placeholder="e.g. 9000000000"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-600 focus:outline-none transition"
          />
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={loading || mobile.length < 10}
          className={`w-full rounded-xl py-3.5 text-sm font-semibold transition
            ${
              loading || mobile.length < 10
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </span>
          ) : (
            "Save & continue →"
          )}
        </button>

        {/* Helper */}
        <p className="mt-4 text-center text-xs text-gray-400">
          We’ll only use this for important updates
        </p>
      </motion.div>
    </div>
  );
}
