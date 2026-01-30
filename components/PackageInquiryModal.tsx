"use client";

import { useState, useEffect } from "react";

interface Package {
  id: number;
  name: string;
  price: string;
  days: string;
}

interface Traveler {
  name: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

interface PackageInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
}

export default function PackageInquiryModal({
  isOpen,
  onClose,
  selectedPackage,
}: PackageInquiryModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    departureDate: "",
    message: "",
  });
  const [travelers, setTravelers] = useState<Traveler[]>([
    { name: "", dateOfBirth: "", gender: "", nationality: "", passportNumber: "", passportExpiry: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const totalTravelers = formData.adults + formData.children;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    // Update travelers array when count changes
    const newTravelers: Traveler[] = [];
    for (let i = 0; i < totalTravelers; i++) {
      newTravelers.push(
        travelers[i] || { name: "", dateOfBirth: "", gender: "", nationality: "", passportNumber: "", passportExpiry: "" }
      );
    }
    setTravelers(newTravelers);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalTravelers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/package-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          travelers,
          packageName: selectedPackage?.name || "",
          packagePrice: selectedPackage?.price || "",
          packageDays: selectedPackage?.days || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          adults: 1,
          children: 0,
          departureDate: "",
          message: "",
        });
        setTravelers([{ name: "", dateOfBirth: "", gender: "", nationality: "", passportNumber: "", passportExpiry: "" }]);
        setStep(1);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        setError(data.error || "Failed to send inquiry");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "adults" || name === "children") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTravelerChange = (
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    const newTravelers = [...travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setTravelers(newTravelers);
  };

  const handleClose = () => {
    setStep(1);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] p-6 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white mb-1">Book This Package</h2>
          {selectedPackage && (
            <div className="flex items-center gap-3 mt-3">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-medium">
                {selectedPackage.name}
              </span>
              <span className="text-white/80 text-sm">{selectedPackage.days}</span>
              <span className="text-white font-semibold">{selectedPackage.price}</span>
            </div>
          )}

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 mt-5">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${step >= 1 ? 'bg-white text-[#b8956a]' : 'bg-white/20 text-white'}`}>
              <span className="w-5 h-5 rounded-full bg-[#b8956a] text-white flex items-center justify-center text-[10px]">1</span>
              Contact Info
            </div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${step >= 2 ? 'bg-white text-[#b8956a]' : 'bg-white/20 text-white'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#b8956a] text-white' : 'bg-white/30 text-white'}`}>2</span>
              Travelers
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Sent Successfully!</h3>
              <p className="text-gray-600">We&apos;ll contact you within 24 hours with booking details.</p>
            </div>
          ) : (
            <>
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400"
                        placeholder="+62 xxx xxxx xxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Number of Adults *
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition-colors"
                        >
                          -
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-gray-900">{formData.adults}</span>
                          <p className="text-xs text-gray-500">Adults (12+)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, adults: Math.min(10, prev.adults + 1) }))}
                          className="w-10 h-10 rounded-xl bg-[#b8956a] hover:bg-[#a07d5a] flex items-center justify-center text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Number of Children
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 font-bold transition-colors"
                        >
                          -
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-gray-900">{formData.children}</span>
                          <p className="text-xs text-gray-500">Children (2-11)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, children: Math.min(10, prev.children + 1) }))}
                          className="w-10 h-10 rounded-xl bg-[#b8956a] hover:bg-[#a07d5a] flex items-center justify-center text-white font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-r from-[#faf6f1] to-[#f5f0ea] rounded-2xl p-4 border border-[#b8956a]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Travelers</p>
                        <p className="text-2xl font-bold text-[#b8956a]">{totalTravelers} {totalTravelers === 1 ? 'Person' : 'People'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{formData.adults} Adult{formData.adults > 1 ? 's' : ''}</p>
                        {formData.children > 0 && (
                          <p className="text-xs text-gray-500">{formData.children} Child{formData.children > 1 ? 'ren' : ''}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Departure Month
                    </label>
                    <input
                      type="month"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all resize-none text-gray-900 placeholder:text-gray-400"
                      placeholder="Any special requests or questions..."
                    ></textarea>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
                  >
                    Continue to Traveler Details
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Step 2: Traveler Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <span className="text-sm text-gray-500">
                      {totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {travelers.map((traveler, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-[#faf6f1] to-[#f5f0ea] rounded-2xl p-5 border border-[#b8956a]/20"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Traveler {index + 1}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {index < formData.adults ? 'Adult' : 'Child'}
                            </p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Full Name (as in Passport) *
                            </label>
                            <input
                              type="text"
                              value={traveler.name}
                              onChange={(e) => handleTravelerChange(index, "name", e.target.value)}
                              required
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                              placeholder="Enter full name as shown on passport"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              value={traveler.dateOfBirth}
                              onChange={(e) => handleTravelerChange(index, "dateOfBirth", e.target.value)}
                              required
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Gender *
                            </label>
                            <select
                              value={traveler.gender}
                              onChange={(e) => handleTravelerChange(index, "gender", e.target.value)}
                              required
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 text-sm cursor-pointer"
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Nationality *
                            </label>
                            <select
                              value={traveler.nationality}
                              onChange={(e) => handleTravelerChange(index, "nationality", e.target.value)}
                              required
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 text-sm cursor-pointer"
                            >
                              <option value="">Select Nationality</option>
                              <option value="Pakistani">Pakistani</option>
                              <option value="Indian">Indian</option>
                              <option value="Bangladeshi">Bangladeshi</option>
                              <option value="Indonesian">Indonesian</option>
                              <option value="Malaysian">Malaysian</option>
                              <option value="British">British</option>
                              <option value="American">American</option>
                              <option value="Canadian">Canadian</option>
                              <option value="Saudi">Saudi Arabian</option>
                              <option value="Emirati">Emirati</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Passport Number *
                            </label>
                            <input
                              type="text"
                              value={traveler.passportNumber}
                              onChange={(e) => handleTravelerChange(index, "passportNumber", e.target.value.toUpperCase())}
                              required
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 placeholder:text-gray-400 text-sm uppercase"
                              placeholder="e.g., AB1234567"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Passport Expiry Date *
                            </label>
                            <input
                              type="date"
                              value={traveler.passportExpiry}
                              onChange={(e) => handleTravelerChange(index, "passportExpiry", e.target.value)}
                              required
                              className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b8956a]/50 focus:border-[#b8956a] transition-all text-gray-900 text-sm"
                            />
                            <p className="text-[10px] text-gray-400 mt-1">Passport must be valid for at least 6 months from travel date</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#b8956a] to-[#0d6e6e] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Booking Inquiry
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    By submitting, you agree to our{" "}
                    <a href="/privacy-policy" className="text-[#b8956a] hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms-conditions" className="text-[#b8956a] hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}
