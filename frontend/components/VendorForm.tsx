import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface VendorFormProps {
  initialValues: any;
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;
}

const VendorForm: React.FC<VendorFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [fileInput, setFileInput] = useState<File | null>(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Vendor name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone number")
      .required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    total_amount: Yup.number()
      .required("Total Amount is required")
      .positive("Amount must be positive"),
    status: Yup.string()
      .oneOf(["Paid", "Pending", "Partial"])
      .required("Status is required"),
  });

  useEffect(() => {
    setFileInput(null);
  }, [initialValues]);

  const handleSubmit = (values: any) => {
    const formData = new FormData();
    formData.append("vendor_name", values.name);
    formData.append("vendor_contact_number", values.phone);
    formData.append("vendor_address", values.address);
    formData.append("total_amount", values.total_amount.toString());
    formData.append("status", values.status);

    if (fileInput) {
      formData.append("vendor_bill", fileInput);
    }

    onSubmit(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Add / Edit Vendor</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-semibold mb-2 text-gray-800">
                Vendor Name
              </label>
              <Field
                id="name"
                name="name"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter vendor name"
                aria-required="true"
              />
              <ErrorMessage name="name" component="div" className="text-red-600 mt-1 text-sm" />
            </div>

            <div>
              <label htmlFor="phone" className="block font-semibold mb-2 text-gray-800">
                Contact Number
              </label>
              <Field
                id="phone"
                name="phone"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter 10-digit phone number"
                aria-required="true"
              />
              <ErrorMessage name="phone" component="div" className="text-red-600 mt-1 text-sm" />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block font-semibold mb-2 text-gray-800">
                Address
              </label>
              <Field
                as="textarea"
                id="address"
                name="address"
                rows={3}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
                placeholder="Vendor address"
                aria-required="true"
              />
              <ErrorMessage name="address" component="div" className="text-red-600 mt-1 text-sm" />
            </div>

            <div>
              <label htmlFor="vendor_bill" className="block font-semibold mb-2 text-gray-800">
                Bill (PDF/Image)
              </label>
              <input
                id="vendor_bill"
                name="vendor_bill"
                type="file"
                accept=".pdf,image/*"
                className="block w-full border border-gray-300 rounded-md p-2 cursor-pointer"
                onChange={(e) => setFileInput(e.currentTarget.files ? e.currentTarget.files[0] : null)}
              />
              <p className="text-gray-500 text-xs mt-1">
                Upload vendor's bill in PDF or image format
              </p>
            </div>

            <div>
              <label htmlFor="total_amount" className="block font-semibold mb-2 text-gray-800">
                Total Amount
              </label>
              <Field
                id="total_amount"
                name="total_amount"
                type="number"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter total amount"
                aria-required="true"
              />
              <ErrorMessage name="total_amount" component="div" className="text-red-600 mt-1 text-sm" />
            </div>

            <div>
              <label htmlFor="status" className="block font-semibold mb-2 text-gray-800">
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                aria-required="true"
              >
                <option value="">Select status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-red-600 mt-1 text-sm" />
            </div>
          </div>

          <div className="flex justify-center space-x-6 mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-10 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition text-lg"
            >
              Save
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-400 text-white font-semibold py-3 px-10 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition text-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default VendorForm;
