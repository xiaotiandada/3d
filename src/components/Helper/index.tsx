import { GizmoHelper, GizmoViewport } from '@react-three/drei';

const Helper = () => {
  return (
    <>
      <gridHelper />
      <axesHelper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
    </>
  );
};

export default Helper;
