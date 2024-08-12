import { useState } from 'react';
import { AddressFormProps } from '../@Types/productType';



const AddressForm: React.FC<AddressFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        postalCode: '',
        country: '',
        houseNumber: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData); // Call the onSubmit prop with the address data
    };

    return (
        <div className="address-form">
            <h2 className="text-xl font-semibold mb-4">Enter Your Address</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Address</button>
            </form>
        </div>
    );
};

export default AddressForm;
