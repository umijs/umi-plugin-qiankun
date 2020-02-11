import { useRootExports } from 'umi';
import Link from 'umi/link';

export default function(props) {
  const rootExports = useRootExports();
  const { abc } = props.match.params
  return (
    <div>
      <h1>{abc}</h1>
    </div>
  );
}
