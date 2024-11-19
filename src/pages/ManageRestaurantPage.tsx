import {
  useCreateMyReataurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyReataurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  if (isGetLoading) {
    return <span>...Loading</span>;
  }

  if (!currentRestaurant) {
    return <span>Unable to load the restaurant</span>;
  }
  const isEditing = !!currentRestaurant;

  return (
    <ManageRestaurantForm
      currentRestaurant={currentRestaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
};

export default ManageRestaurantPage;
