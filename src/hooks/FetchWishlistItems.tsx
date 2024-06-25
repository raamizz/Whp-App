import { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useUser } from "@/context/UserContext";
import Cookies from "js-cookie";

export const useFetchWishlistItems = () => {
  const [fetchedWishlistItems, setFetchedWishlistItems] = useState<
    WishlistItem[]
  >([]);
  const [cookieToken, setCookieToken] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isLoggedIn } = useUser();

  const { getWishlist } = useWishlist();

  useEffect(() => {
    if (isLoggedIn) {
      const userToken = Cookies.get("localtoken");
      if (userToken) {
        // setIsLoggedIn(true);
        setCookieToken(userToken);
      }
    }
  }, []);

  console.log;

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        setIsLoading(true);
        const wishlistData = await getWishlist();
        let localWishlistItems = null;
        if (typeof window !== "undefined") {
          localWishlistItems = JSON.parse(
            localStorage.getItem("wishlistItems") || "[]"
          );
        }
        const mergedWishlistItems = [...wishlistData, ...localWishlistItems];
        const uniqueWishlistItems = mergedWishlistItems.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.productId === item.productId)
        );
        setFetchedWishlistItems(uniqueWishlistItems);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistItems();
  }, [isLoggedIn, cookieToken, getWishlist]);

  return { fetchedWishlistItems, isLoading, error };
};
