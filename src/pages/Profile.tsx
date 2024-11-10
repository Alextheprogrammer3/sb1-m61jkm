import { Component } from "solid-js";
import Card from "../components/common/Card";

const Profile: Component = () => {
  return (
    <div class="p-6 space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">User Profile</h1>
      <Card>
        <div class="text-center py-8">
          <p class="text-gray-600">User profile management coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default Profile;