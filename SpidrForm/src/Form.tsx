import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    airFryerCost: '',
    spidrPin: ''
  });

  const handlePhoneFormat = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    else if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    else return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    if (parts[1]?.length > 2) value = parts[0] + '.' + parts[1].slice(0, 2);
    if (value.length > 0 && !value.startsWith('$')) value = '$' + value;

    setFormData(prev => ({ ...prev, airFryerCost: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'spidrPin') {
      let digits = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1-');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'phone') {
      const formatted = handlePhoneFormat(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 text-white"
      >
        <h2 className="text-3xl font-semibold mb-4 text-white">Enter your details</h2>

        {[
          { label: 'First name', name: 'firstName', type: 'text' },
          { label: 'Last name', name: 'lastName', type: 'text' },
          { label: 'Phone number', name: 'phone', type: 'tel', placeholder: '(___) ___-____' },
          { label: 'Email address', name: 'email', type: 'email' },
          { label: "Guess the air fryer's cost", name: 'airFryerCost', type: 'text', placeholder: '$0.00' },
          { label: 'PIN', name: 'spidrPin', type: 'text', placeholder: '####-####-####-####' }
        ].map(({ label, name, type, placeholder }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 text-sm font-medium">{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={name === 'airFryerCost' ? handleCostChange : handleChange}
              required
              className={`bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3  hover:border-white focus:outline-none focus:ring-2 focus:ring-[#479daf] transition duration-200`}
            />
          </div>
        ))}

        <button
          type="submit"
          className= {`w-full bg-[#479daf] text-black font-bold py-3 rounded-xl hover:bg-[#1f7283] transition duration-200`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
