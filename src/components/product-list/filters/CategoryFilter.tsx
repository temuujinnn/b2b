"use client";
import React, { useEffect, useState } from "react";
import {
  Text,
  VStack,
  HStack,
  Skeleton,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { UseApi } from "@/hooks/useApi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Category, GetSubCategories } from "@/_services";
import { IconX } from "@tabler/icons-react";
import { grey100, grey50 } from "@/theme/colors";

export const CategoryFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryid = params?.categoryid as string;
  const currentSubCategory = searchParams?.get("sub");

  const [
    { data: categoriesData, isLoading: categoriesLoading },
    fetchCategories,
  ] = UseApi({
    service: Category,
  });

  const [
    { data: subCategoriesData, isLoading: subCategoriesLoading },
    fetchSubCategories,
  ] = UseApi({
    service: GetSubCategories,
  });

  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<
    string | null
  >(categoryid || null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(currentSubCategory || null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedMainCategoryId) {
      fetchSubCategories({
        categoryid: selectedMainCategoryId,
      });
    }
  }, [selectedMainCategoryId]);

  const handleMainCategoryChange = (categoryId: string) => {
    if (selectedMainCategoryId !== categoryId) {
      setSelectedMainCategoryId(categoryId);
      setSelectedSubCategoryId(null);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string, name: string) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() || [])
    );
    current.set("sub", subCategoryId);
    current.set("part", name);
    current.delete("brand");
    current.delete("maxPrice");
    current.delete("minPrice");
    current.delete("sort");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    // router.push(`${selectedMainCategoryId}${query}`);
    const newUrl = query
      ? `${window.location.pathname}${query}`
      : window.location.pathname;
    router.replace(newUrl, { scroll: false });

    setSelectedSubCategoryId(subCategoryId);
  };

  if (categoriesLoading) {
    return (
      <VStack
        gap={4}
        w="full"
        h={400}
        borderRadius={"8px"}
        align="flex-start"
        bg="white"
      >
        <Skeleton
          height="40px"
          width="100%"
          startColor={grey50}
          endColor={grey100}
        />
        <Skeleton
          height="40px"
          width="100%"
          startColor={grey50}
          endColor={grey100}
        />
        <Skeleton
          height="40px"
          width="100%"
          startColor={grey50}
          endColor={grey100}
        />
      </VStack>
    );
  }

  return (
    <VStack
      display={{
        base: "none",
        md: categoriesData?.length !== 0 ? "flex" : "none",
      }}
      w="full"
      maxH={"400px"}
      borderRadius={"8px"}
      width="100%"
      align="flex-start"
      bg="white"
      gap={"8px"}
      position="relative"
      zIndex={11}
      overflow="auto"
      p={"8px 16px"}
    >
      {/* <Text fontSize={14} fontWeight={700} py={2}>
        Ангилал
      </Text> */}
      {categoriesData && categoriesData.length > 0 ? (
        <Accordion
          w="full"
          px={2}
          allowToggle
          index={categoriesData.findIndex(
            (cat: any) => cat.categoryid?.toString() === selectedMainCategoryId
          )}
          onChange={(expandedIndex) => {
            if (expandedIndex === -1) {
              setSelectedMainCategoryId(null);
            } else if (typeof expandedIndex === "number") {
              const categoryId =
                categoriesData[expandedIndex]?.categoryid?.toString();
              setSelectedMainCategoryId(categoryId);
            }
          }}
        >
          {categoriesData.map((mainCategory: any) => (
            <AccordionItem
              key={mainCategory.categoryid}
              w="full"
              border="none"
              py={1}
            >
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() =>
                      handleMainCategoryChange(
                        mainCategory.categoryid!.toString()
                      )
                    }
                    _hover={{ bg: "gray.50" }}
                    px={0}
                  >
                    <HStack w="full" justify="space-between">
                      <Text
                        variant="subtitle3"
                        noOfLines={1}
                        isTruncated
                        maxW="200px"
                      >
                        {mainCategory.name}
                      </Text>
                      <AccordionIcon />
                    </HStack>
                  </AccordionButton>
                  <AccordionPanel pb={4} px={0} maxH="200px" overflowY="auto">
                    {subCategoriesLoading ? (
                      <VStack w="full">
                        {[...Array(3)].map((_, index) => (
                          <Skeleton
                            key={index}
                            height="30px"
                            width="100%"
                            startColor={grey50}
                            endColor={grey100}
                          />
                        ))}
                      </VStack>
                    ) : subCategoriesData && subCategoriesData.length > 0 ? (
                      <VStack w="full" spacing={2} align="stretch">
                        {subCategoriesData.map((subCategory: any) => (
                          <HStack
                            key={subCategory.categoryid}
                            onClick={() =>
                              handleSubCategoryClick(
                                subCategory.categoryid!.toString(),
                                subCategory.name.toString()
                              )
                            }
                            bg={
                              selectedSubCategoryId ===
                              subCategory.categoryid?.toString()
                                ? "#F6F6F6"
                                : "transparent"
                            }
                            borderRadius="8px"
                            cursor="pointer"
                            _hover={{ bg: "#F6F6F6" }}
                            py={1}
                            px={2}
                            justify="space-between"
                          >
                            <Text
                              variant={
                                currentSubCategory ==
                                subCategory.categoryid.toString()
                                  ? "subtitle3"
                                  : "body3"
                              }
                              noOfLines={1}
                              isTruncated
                            >
                              {subCategory.name}
                            </Text>
                            {currentSubCategory ===
                              subCategory.categoryid.toString() && (
                              <IconX
                                size={16}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`?part=${mainCategory?.name} `);

                                  setSelectedMainCategoryId(null);
                                  setSelectedSubCategoryId(null);
                                }}
                              />
                            )}
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text fontSize="12px" color="gray.500" textAlign="center">
                        No sub-categories available
                      </Text>
                    )}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Text p={4}>No categories available.</Text>
      )}
    </VStack>
  );
};
