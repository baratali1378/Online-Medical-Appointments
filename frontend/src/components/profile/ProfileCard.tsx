import Image from "next/image";
import { PatientProfile } from "@/types/patient";

export default function ProfileCard({ profile }: { profile: PatientProfile }) {
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${profile.personal_info.image?.url}`;

  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-md">
      <Image
        src={imageUrl}
        alt="Profile"
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3 className="text-lg font-bold mt-2">
        {profile.personal_info.fullname}
      </h3>
      <p className="text-gray-500">{profile.personal_info.email}</p>
      <p className="text-gray-500">{profile.contact.phone_number}</p>
    </div>
  );
}
