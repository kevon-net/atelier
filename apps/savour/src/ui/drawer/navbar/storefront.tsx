import React from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AnchorNextLink } from '@repo/ui';
import {
  Drawer,
  Box,
  Group,
  Title,
  Flex,
  FlexProps,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuSub,
  MenuSubDropdown,
  MenuSubItem,
  MenuSubTarget,
  MenuTarget,
  Stack,
  ActionIcon,
  NavLink as MantineNavLink,
  Divider,
  NavLinkProps,
  MenuItemProps,
} from '@mantine/core';
import {
  Icon,
  IconBurger,
  IconChevronDown,
  IconCup,
  IconPizza,
  IconSoup,
  IconX,
} from '@tabler/icons-react';
import { ICON_SIZE, ICON_STROKE_WIDTH, ICON_WRAPPER_SIZE } from '@repo/constants';
import { usePathname } from 'next/navigation';

export default function DrawerNavbarStorefront({ children }: { children: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} withCloseButton={false} size={280}>
        <Stack>
          <Group wrap="nowrap" justify="space-between">
            <BrandLogo />

            <ActionIcon
              size={ICON_WRAPPER_SIZE}
              radius={999}
              color="black"
              variant="default"
              onClick={close}
            >
              <IconX size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />
            </ActionIcon>
          </Group>

          <NavbarStorefront flexProps={{ direction: 'column' }} />
        </Stack>
      </Drawer>

      <span onClick={open}>{children}</span>
    </>
  );
}

type Link = {
  path: string;
  label: string;
  icon?: Icon;
};

type Navlink = Link & {
  subLinks?: Navlink[];
};

const navlinks: Navlink[] = [
  {
    path: '/about',
    label: 'About Us',
  },
  {
    path: '/menu',
    label: 'Menu',
    subLinks: [
      {
        path: '/menu/pizzas',
        label: 'Pizzas',
        icon: IconPizza,
        subLinks: [
          {
            path: '/menu/pizzas/meaty',
            label: 'Meaty Pizzas',
          },
          {
            path: '/menu/pizzas/veggie',
            label: 'Veggie Pizzas',
          },
        ],
      },
      {
        path: '/menu/burgers',
        label: 'Burgers',
        icon: IconBurger,
      },
      {
        path: '/menu/bowls',
        label: 'Bowls',
        icon: IconSoup,
      },
      {
        path: '/menu/drinks',
        label: 'Drinks',
        icon: IconCup,
      },
    ],
  },
  {
    path: '/blog',
    label: 'Blog',
  },
  {
    path: '/contact',
    label: 'Contact Us',
  },
];

export function BrandLogo() {
  return (
    <AnchorNextLink href={'/'}>
      <Title order={1} c={'var(--mantine-color-text)'}>
        savor<span className="text-[#e66b45]">.</span>
      </Title>
    </AnchorNextLink>
  );
}

function LinkAnchor({ link }: { link: Navlink }) {
  const pathname = usePathname();
  const active = pathname == link.path || (pathname != link.path && pathname.includes(link.path));

  return (
    <AnchorNextLink
      href={link.path}
      fz="lg"
      fw={'bold'}
      underline="never"
      c={active ? 'black' : undefined}
    >
      {link.label}
    </AnchorNextLink>
  );
}

function MenuSubLink({ link }: { link: Navlink }) {
  const pathname = usePathname();
  const active = pathname == link.path || (pathname != link.path && pathname.includes(link.path));

  const sharedProps: MenuItemProps = {
    c: active ? 'black' : 'var(--mantine-color-anchor)',
    fw: 'bold',
    leftSection: link.icon ? <link.icon size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} /> : undefined,
  };

  if (!link.subLinks?.length) {
    return (
      <MenuItem component={AnchorNextLink} underline="never" href={link.path} {...sharedProps}>
        {link.label}
      </MenuItem>
    );
  }

  return (
    <MenuSub shadow="md" width={200} openDelay={120} closeDelay={150}>
      <MenuSubTarget>
        <MenuSubItem {...sharedProps}>{link.label}</MenuSubItem>
      </MenuSubTarget>

      <MenuSubDropdown>
        {link.subLinks.map((sl) => (
          <MenuSubLink key={sl.path} link={sl} />
        ))}
      </MenuSubDropdown>
    </MenuSub>
  );
}

function MenuLink({ link }: { link: Navlink }) {
  const pathname = usePathname();
  const active = pathname == link.path || (pathname != link.path && pathname.includes(link.path));

  return (
    <Menu shadow="md" width={200} trigger="click-hover">
      <MenuTarget>
        <span>
          <Group gap={5} align="center" pos={'relative'}>
            <LinkAnchor link={link} />

            {link.subLinks && (
              <Box c={active ? 'black' : 'pri'}>
                <IconChevronDown size={ICON_SIZE - 4} stroke={ICON_STROKE_WIDTH * 2} />
              </Box>
            )}
          </Group>
        </span>
      </MenuTarget>

      <MenuDropdown>
        {link.subLinks?.map((sl) => (
          <MenuSubLink key={sl.path} link={sl} />
        ))}
      </MenuDropdown>
    </Menu>
  );
}

const navLinkProps: NavLinkProps = {
  fw: 'bold',
  style: { borderRadius: 'var(--mantine-radius-default)' },
};

export function LinkNavLink({ link }: { link: Navlink }) {
  const pathname = usePathname();
  const active = pathname == link.path || (pathname != link.path && pathname.includes(link.path));

  const leftSection = link.icon ? (
    <link.icon size={ICON_SIZE} stroke={ICON_STROKE_WIDTH} />
  ) : undefined;

  const sharedProps: NavLinkProps = {
    c: active ? 'black' : 'pri',
    label: link.label,
    leftSection: leftSection,
    defaultOpened: active,
  };

  if (!link.subLinks?.length) {
    return (
      <MantineNavLink
        {...navLinkProps}
        {...sharedProps}
        component={AnchorNextLink}
        href={link.path}
      />
    );
  }

  // If it has sub-links, render a parent NavLink with children recursively
  return (
    <MantineNavLink
      {...navLinkProps}
      {...sharedProps}
      childrenOffset={16}
      // You can add defaultOpened or control expansion state here if needed
    >
      {link.subLinks.map((subLink, i) => (
        <div key={subLink.path}>
          {<Divider my={2} />}
          <LinkNavLink link={subLink} />
        </div>
      ))}
    </MantineNavLink>
  );
}

function NavbarLink({ link, mobile }: { link: Navlink; mobile?: boolean }) {
  if (!link.subLinks?.length) {
    if (mobile) {
      return <LinkNavLink link={link} />;
    } else {
      return <LinkAnchor link={link} />;
    }
  }

  const viewportProps = {
    overlayComponent: mobile ? LinkNavLink : MenuLink,
  };

  return <viewportProps.overlayComponent link={link} />;
}

export function NavbarStorefront({ flexProps }: { flexProps?: FlexProps }) {
  const desktop = useMediaQuery('(min-width: 62em)');

  const navLinkItems = navlinks.map((nl, i) => (
    <div key={nl.path}>
      {!desktop && i > 0 && <Divider my={2} />}
      <NavbarLink link={nl} mobile={!desktop} />
    </div>
  ));

  return (
    <nav>
      <Flex {...flexProps}>{navLinkItems}</Flex>
    </nav>
  );
}
