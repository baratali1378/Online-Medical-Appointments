import { Link, Stack } from "@mui/material";
import { UsefulLink } from "@/types/footer";

const UsefulLinks = ({ links }: { links: UsefulLink[] }) => (
  <Stack spacing={1}>
    {links.map((link) => (
      <Link
        key={link.id}
        href={link.url}
        underline="hover"
        color="inherit"
        sx={{
          fontWeight: 500,
          fontSize: "0.95rem",
          "&:hover": {
            color: "#00ACC1",
            textDecoration: "underline",
          },
        }}
      >
        {link.name}
      </Link>
    ))}
  </Stack>
);

export default UsefulLinks;
