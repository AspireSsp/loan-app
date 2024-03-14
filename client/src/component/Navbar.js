import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link, Outlet } from "react-router-dom";
import { UserState } from "../context/user";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useEffect } from "react";

const Links = [{lable: "My Loans", value: "my-loans"}];

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = UserState();
  const navigate = useNavigate();
  console.log('my user-->', user);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {

  }, [user])
  

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
          <Box cursor={'pointer'} onClick={()=>{user?.role==='admin' ? navigate('/admin') : navigate('/')}}>
            <Image boxSize='65px' src={logo} alt='Dan Abramov' />
          </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {
                Links.map((link) => (
                  <Link to={link.value}>
                    <NavLink key={link.value}>{link.lable}</NavLink>
                  </Link>
                ))
              }
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
              {user?.userName}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {
                Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))
              }
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box p={4}>
        {" "}
        <Outlet />
      </Box>
    </>
  );
}