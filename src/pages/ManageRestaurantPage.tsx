import {
  useCreateMyReataurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isUpdateLoading } =
    useCreateMyReataurant();

  if (isGetLoading) {
    return <span>...Loading</span>;
  }

  if (!currentRestaurant) {
    return <span>Unable to load the restaurant</span>;
  }

  return (
    <ManageRestaurantForm
      currentRestaurant={currentRestaurant}
      onSave={createRestaurant}
      isLoading={isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
