import {
  useCreateMyReataurant,
  useGetMyRestaurant,
  usegetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { TabsContent } from "@radix-ui/react-tabs";

const ManageRestaurantPage = () => {
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyReataurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders } = usegetMyRestaurantOrders();

  if (isGetLoading) {
    return <span>...Loading</span>;
  }

  if (!currentRestaurant) {
    return <span>Unable to load the restaurant</span>;
  }
  const isEditing = !!currentRestaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList className="mb-4">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="p-5 bg-gray-50 pg-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <div key={order._id} className="mt-4">
            <OrderItemCard order={order} />
          </div>
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          currentRestaurant={currentRestaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
