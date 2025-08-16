import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import VendorForm from "../../components/VendorForm";

export default function EditVendor() {
  const router = useRouter();
  const { id } = router.query;
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/vendors/${id}`).then((res) => {
        setVendor(res.data);
      });
    }
  }, [id]);

  const handleUpdateVendor = async (values: any, file?: File) => {
    if (file) {
      alert("Re-upload bill not supported in edit demo.");
    }
    await axios.put(`http://localhost:5000/api/vendors/${id}`, values);
    router.push("/");
  };

  if (!vendor) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Vendor</h1>
      <VendorForm initialValues={vendor} onSubmit={handleUpdateVendor} />
    </div>
  );
}
