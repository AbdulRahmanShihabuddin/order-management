import { useState } from 'react';
import { validateCheckoutForm, hasErrors } from '../utils/validation';

export default function CheckoutForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState({ fullName: '', address: '', phoneNumber: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateCheckoutForm({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] || undefined }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateCheckoutForm(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(form);
    setErrors(validationErrors);
    setTouched({ fullName: true, address: true, phoneNumber: true });
    if (!hasErrors(validationErrors)) {
      onSubmit(form);
    }
  };

  const fieldClass = (field) =>
    `w-full bg-surface-container-lowest border ${errors[field] ? 'border-error' : 'border-outline-variant'} rounded-lg px-sm py-sm focus:outline-none ${errors[field] ? 'focus:border-error focus:ring-1 focus:ring-error' : 'focus:border-primary focus:ring-1 focus:ring-primary'} font-body-lg text-body-lg text-on-surface`;

  const labelClass = (field) =>
    `block font-label-md text-label-md ${errors[field] ? 'text-error' : 'text-on-surface-variant'} mb-base`;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_16px_rgba(45,49,66,0.08)] p-md md:p-lg border border-outline-variant/30">
      <h2 className="font-h3 text-h3 text-on-surface mb-md pb-base border-b border-outline-variant/50">Delivery Details</h2>
      <form className="space-y-md" onSubmit={handleSubmit} id="checkout-form">
        <div>
          <label className={labelClass('fullName')} htmlFor="fullName">Full Name</label>
          <input className={fieldClass('fullName')} id="fullName" type="text" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} onBlur={() => handleBlur('fullName')} />
          {errors.fullName && <p className="font-label-sm text-label-sm text-error mt-base">{errors.fullName}</p>}
        </div>
        <div>
          <label className={labelClass('address')} htmlFor="address">Delivery Address</label>
          <textarea className={fieldClass('address')} id="address" rows="3" value={form.address} onChange={(e) => handleChange('address', e.target.value)} onBlur={() => handleBlur('address')} />
          {errors.address && <p className="font-label-sm text-label-sm text-error mt-base">{errors.address}</p>}
        </div>
        <div>
          <label className={labelClass('phoneNumber')} htmlFor="phone">Phone Number</label>
          <div className="relative">
            <input className={`${fieldClass('phoneNumber')} pr-10`} id="phone" placeholder="(555) 000-0000" type="tel" value={form.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} onBlur={() => handleBlur('phoneNumber')} />
            {errors.phoneNumber && (
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-error" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
            )}
          </div>
          {errors.phoneNumber && <p className="font-label-sm text-label-sm text-error mt-base">{errors.phoneNumber}</p>}
        </div>
      </form>
    </div>
  );
}
