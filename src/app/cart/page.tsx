"use client";
import { EmptyCart, GetCartProducts, UpdateCart } from "@/_services/user";
import {
  BreadCrumb,
  CartProductCard,
  ConsultModal,
  OrderInfo,
  SelectLocation,
} from "@/components";
import { UseApi, useCustomToast } from "@/hooks";
import { ExelIcon, LongArrow } from "@/icons";
import { clearCart } from "@/redux/slices/cartSlice";
import {
  error600,
  grey100,
  grey200,
  grey50,
  grey500,
  primary,
} from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IconPackage, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [localProducts, setLocalProducts] = useState<any[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const toast = useCustomToast();
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [{ data: products, isLoading: productLoader }, getCartProduct] = UseApi(
    {
      service: GetCartProducts,
      useAuth: true,
    }
  );

  const [
    { data: emptyCartData, isLoading: emptyCartLoader, successMessage },
    emptyCart,
  ] = UseApi({
    service: EmptyCart,
    useAuth: true,
  });

  const [{ data: updateCartData, isLoading: updateLoader }, updateCart] =
    UseApi({
      service: UpdateCart,
      useAuth: true,
    });

  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (successMessage) {
      setLocalProducts([]);
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || "",
      });
      onClose();
      dispatch(clearCart());
    }
  }, [emptyCartData, successMessage]);

  useEffect(() => {
    if (localProducts && localProducts.length > 0) {
      const total = localProducts.reduce((acc, item: any) => {
        return acc + (item?.price || 0) * (item?.quantity || 0);
      }, 0);

      setAllTotal(total);
    } else {
      setAllTotal(0);
    }
  }, [localProducts]);

  useEffect(() => {
    getCartProduct();
  }, []);

  const handleEmptyCart = () => {
    emptyCart();
  };

  const handleUpdateCard = () => {
    const formdata = new FormData();
    localProducts.map((product: any) => {
      formdata.append("partid[]", product?.partid);
      formdata.append("quantity[]", product?.quantity);
    });

    updateCart(formdata);
  };

  return (
    <VStack w="full" pb={110} minH="100vh" align="flex-start">
      <HStack my={"22px"}>
        <Text variant="subtitle2">1. Сагс</Text>
        <LongArrow />
        <Text variant="body2" color={grey500}>
          2. Хаяг
        </Text>
        <LongArrow />
        <Text variant="body2" color={grey500}>
          3. Төлбөр төлөлт
        </Text>
      </HStack>
      <HStack w="full" gap={6} align="flex-start">
        <VStack flex={4} gap={6}>
          <VStack
            w="full"
            gap={6}
            align="flex-start"
            p={6}
            borderRadius={8}
            border={`1px solid ${grey200}`}
            flex={4}
          >
            <HStack
              w="full"
              justify="space-between"
              display={localProducts?.length > 0 ? "flex" : "none"}
            >
              <HStack gap={4}>
                <Text variant="h8">Сагс</Text>
                <Text variant="subtitle2" color={grey500}>
                  {localProducts?.length || 0} бүтээгдэхүүн
                </Text>
              </HStack>
              <HStack
                p={0}
                cursor="pointer"
                display={localProducts?.length > 0 ? "flex" : "none"}
                onClick={onOpen}
              >
                <IconTrash color={error600} size={20} />

                <Text variant="body2" color={error600}>
                  Бүгдийг нь устгах
                </Text>
              </HStack>
            </HStack>
            <Button
              display={localProducts?.length > 0 ? "flex" : "none"}
              w="full"
              variant="outline"
              leftIcon={<ExelIcon />}
            >
              Excel файлаар татах
            </Button>
            {productLoader ? (
              <VStack w="full">
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
              </VStack>
            ) : localProducts?.length > 0 ? (
              localProducts?.map((product, index) => {
                return (
                  <Link
                    href={`/product-detail/${product?.articleid}`}
                    target="_blank"
                    key={index}
                    style={{ width: "100%" }}
                  >
                    <CartProductCard
                      data={product}
                      setLocalProducts={setLocalProducts}
                      setAllTotal={setAllTotal}
                    />
                  </Link>
                );
              })
            ) : (
              <VStack
                w="full"
                py={10}
                gap={1}
                alignItems="center"
                justify="center"
              >
                <Image src="/cartempty.svg" h={217} w={263} />
                <Text variant="subtitle2">Таны сагс хоосон байна!</Text>
                <Text color={grey500} variant="body3">
                  Танд сагсалсан бүтээгдэхүүн одоогоор байхгүй байна.
                </Text>
                <Link href="/">
                  <Button variant="outline" mt={3}>
                    Худалдан авалт хийх
                  </Button>
                </Link>
              </VStack>
            )}
          </VStack>
        </VStack>
        <OrderInfo
          total={allTotal}
          selectedAddress={selectedAddress}
          items={localProducts?.length}
          showReg={false}
          handleCreateData={(
            isOrganization: boolean,
            regNumber: string,
            regData?: any
          ) => {}}
          handleUpdateCard={handleUpdateCard}
          updateCartLoader={updateLoader}
        />
        <ConsultModal
          iconBg="#FEF3F2"
          icon={<IconTrash color="#D92D20" size={28} />}
          isOpen={isOpen}
          onClose={onClose}
          buttonStr="Хоослох"
          buttonLoader={emptyCartLoader}
          buttonAction={handleEmptyCart}
          title="Та сагсаа хоослохдоо итгэлтэй байна уу?"
          desc="Таны сагсалсан бүтээгдэхүүнүүд сагснаас устгагдах бөгөөд худалдан авалт хийхийн тулд ахин бүтээгдэхүүнээ сагслах шаардлагатайг анхаарна уу"
        />
      </HStack>
    </VStack>
  );
}
