import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

type FilteProps = {
  name?: string;
  value: string;
  type: string;
  options: string[];
  onSelect: (option: string) => void;
};

function Filter({ name, value, options, onSelect }: FilteProps) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        width="85%"
        marginTop={5}
        rightIcon={<ChevronDownIcon />}>
        {value || name}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => onSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default Filter;
