/**
 * Analytics & Conversion Tracking Utilities
 * 
 * Este arquivo contém funções para rastrear eventos de conversão
 * através do Google Tag Manager e Meta Pixel.
 */

// Declaração do dataLayer para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Envia um evento personalizado para o Google Tag Manager
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

/**
 * Rastreia clique em botão de WhatsApp
 */
export const trackWhatsAppClick = (phoneNumber: string) => {
  trackEvent('whatsapp_click', {
    phone_number: phoneNumber,
    conversion_type: 'lead',
  });
  
  // Meta Pixel - Lead event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: 'WhatsApp Click',
      content_category: 'Contact',
      value: phoneNumber,
    });
  }
};

/**
 * Rastreia clique em link de e-mail
 */
export const trackEmailClick = (email: string) => {
  trackEvent('email_click', {
    email_address: email,
    conversion_type: 'lead',
  });
  
  // Meta Pixel - Contact event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: 'Email Click',
      content_category: 'Contact',
    });
  }
};

/**
 * Rastreia visualização de seção de planos
 */
export const trackPricingView = () => {
  trackEvent('pricing_view', {
    page_location: window.location.href,
  });
};

/**
 * Rastreia clique em botão de CTA (Call-to-Action)
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
  
  // Meta Pixel - InitiateCheckout event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: ctaName,
      content_category: ctaLocation,
    });
  }
};

/**
 * Rastreia scroll até uma seção específica
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};
