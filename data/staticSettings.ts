import { SystemSettings } from '../types';

// ==========================================================================================
// 📝 EDIT THIS FILE TO UPDATE GLOBAL APP SETTINGS (VISSIBLE TO ALL USERS)
// These settings will override the local defaults.
// ==========================================================================================

export const STATIC_SETTINGS: Partial<SystemSettings> = {
  // --- APP INFO ---
  appName: 'NST AI Assistant',
  footerText: 'Developed by Nadim Anwar',
  
  // --- LIVE DASHBOARDS (NOTICES) ---
  // Top Red Marquee
  liveMessage1: 'Welcome to NST AI Assistant! Check out the new Study Material section.',
  // Bottom Blue Marquee
  liveMessage2: 'For premium credits, contact Admin.',
  // Login Screen Scrolling Text
  marqueeLines: ["Welcome to NST AI", "Learn Smart", "Contact Admin for Credits"], 
  
  // --- MAINTENANCE MODE ---
  // Set to true to lock the app for everyone except Admin
  maintenanceMode: false,
  maintenanceMessage: 'We are upgrading our servers. Please check back later.',
  
  // --- FEATURES ---
  isChatEnabled: true,
  isGameEnabled: true,
  allowSignup: true,
  
  // --- PAYMENT INFO ---
  isPaymentEnabled: true,
  upiId: 'example@upi',
  upiName: 'NST Admin',
  paymentInstructions: 'Pay via UPI and send screenshot on WhatsApp.',
  adminPhone: '+919876543210',
  
  // --- ADS ---
  startupAd: {
    enabled: true,
    duration: 3,
    title: "Premium Features",
    features: ["AI Notes Generator", "MCQ Practice", "Live Chat Support"],
    bgColor: "#1e293b",
    textColor: "#ffffff"
  }
};
