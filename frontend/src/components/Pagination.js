import React from "react";
import styled from "styled-components";

const PaginationBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const PageNumber = styled.Text`
  padding: 10px;
`;
const PageButtonBox = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.buttonBackground};
  align-items: center;
  border-radius: 4px;
  width: 50px;
  border-radius: 4px;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const PageButton = styled.Text`
  color: ${({ theme }) => theme.buttonTitle};
`;
const PaginationContainer = styled.View`
  height: 80px;
  width: 100%;
`;

const Pagination = ({
  lastPage,
  pageNumber,
  prevButtonPress,
  nextButtonPress,
}) => {
  return (
    <PaginationContainer>
      <PaginationBox>
        <PageButtonBox onPress={prevButtonPress} disabled={pageNumber === 1}>
          <PageButton>Prev</PageButton>
        </PageButtonBox>
        <PageNumber>{pageNumber}</PageNumber>
        <PageButtonBox
          onPress={nextButtonPress}
          disabled={pageNumber === lastPage}
        >
          <PageButton>Next</PageButton>
        </PageButtonBox>
      </PaginationBox>
    </PaginationContainer>
  );
};

export default Pagination;
