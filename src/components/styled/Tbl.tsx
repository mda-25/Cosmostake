import styled from 'styled-components';
import { Table as BTable } from 'react-bootstrap';

const Tbl: any = styled(BTable)`
    margin-bottom: 0;
    text-align: center;
    color: ${({ theme }) => theme.black};
    background-color: white;
`;

Tbl.Tr = styled.tr`
    height: ${({ h }: any) => h || '40px'};
    vertical-align: middle;
`;

Tbl.Th = styled.th`
    font-size: ${({ theme }) => theme.fs14};
    color: ${({ theme }) => theme.gray};
    text-transform: uppercase;
`;

Tbl.THead = styled.thead`
    width: 100%;
    position: sticky;
    top: 0;
    backdrop-filter: blur(20px);
    background: rgba(136, 152, 170, 0.4);
`;

Tbl.TBody = styled.tbody`
    border-color: rgba(128, 128, 128, 0.2);
`;

export default Tbl;
