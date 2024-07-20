import * as S from "./SortButton.styles";

type SortButtonProps = {
  sortFlag: boolean;
  setSortFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SortButton: React.FC<SortButtonProps> = ({
  sortFlag,
  setSortFlag,
}) => {
  return (
    <S.StyledSortButton onClick={() => setSortFlag((value) => !value)}>
      Sortuj {sortFlag ? "⬆" : "⬇"}
    </S.StyledSortButton>
  );
};
