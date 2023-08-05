import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BottomNavigationSection() {
    const router = useRouter();
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 5 }}>
      <BottomNavigation
        showLabels
        sx={{ backgroundColor: "#000000", height: 75 }}
      >
        <BottomNavigationAction
          sx={{ color: "#FFFFFF", minWidth: "70px" }}
          label="Суші"
          icon={
            <Image
              src="/assets/icons/susi_white.png"
              alt="Суші"
              height={45}
              width={45}
            />
          }
          onClick={() => {
            router.push("/menu/sushi");
          }}
        />
        <BottomNavigationAction
          sx={{ color: "#FFFFFF", minWidth: "70px" }}
          label="Роли"
          icon={
            <Image
              src="/assets/icons/rols_white.png"
              alt="Роли"
              height={45}
              width={45}
            />
          }
          onClick={() => {
            router.push("/menu/rols");
          }}
        />
        <BottomNavigationAction
          sx={{ color: "#FFFFFF", minWidth: "70px" }}
          label="Сети"
          icon={
            <Image
              src="/assets/icons/sets_white.png"
              alt="Сети"
              height={45}
              width={45}
            />
          }
          onClick={() => {
            router.push("/menu/sets");
          }}
        />
        <BottomNavigationAction
          sx={{ color: "#FFFFFF", minWidth: "70px" }}
          label="Десерти"
          icon={
            <Image
              src="/assets/icons/deserts_white.png"
              alt="Десерти"
              height={45}
              width={45}
            />
          }
          onClick={() => {
            router.push("/menu/desserts");
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
