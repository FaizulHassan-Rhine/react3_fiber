
import { Canvas , useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport, useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { SpotLightHelper } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './App.css'


const LightWithHelper = () => {
  const light = useRef()

  const { angle , penumbra } = useControls({
    angle: { value: Math.PI / 8, min: 0, max: Math.PI / 2, step: 0.01 }, 
    penumbra: { value: 0.0, min: 0, max: 1, step: 0.1 }
  });
  
  
  
  useHelper(light, SpotLightHelper, 'orange')

  
  return (
    <spotLight ref={light} castShadow angle={angle} penumbra={penumbra} intensity={200}  position={[2, 6, -10]} />
  )
}

const Box = ({position,size}) => {
  const boxRef = useRef()

  const {color,speed} = useControls({
    color: '#ff0000',
    speed: {
      value: 0.005,
      min: 0.00,
      max: 0.03,
      step: 0.001
    }
  })

  useFrame(() => {
   boxRef.current.rotation.x += speed;
   boxRef.current.rotation.y += speed;
   boxRef.current.rotation.z += speed;

  })
  return (
    
    <mesh ref={boxRef}  position={position} castShadow>
      <axesHelper args={[5]} />
      <boxGeometry args={size} />
      <meshStandardMaterial color={color}  />
    </mesh>
    
  )
}

const Model = () => {
  const result = useLoader(GLTFLoader, "./model.glb")
  return <primitive object={result.scene} scale={[30, 30, 30]} position={[0, 0, 0]} rotation={[0, Math.PI/1.1, -0.2]} />
}
const Circle = ({position,size,color}) => {

  return (
   
      <mesh position={position}>
      <sphereGeometry args={size} />
      <meshStandardMaterial  color={color}  />
    </mesh>
 
  )
}
const Test = ({position,size,color}) => {
  return (
   
      <mesh position={position} rotation={[-Math.PI/2,0,0]}  receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial  color={color}  />
    </mesh>
 
  )
}

const App = () => {
 

  return (
   <Canvas shadows camera={{position: [5, 5, 5]}}>
    <OrbitControls />
    {/* <GizmoHelper alignment='bottom-right' margin={[80, 80]} >
      <GizmoViewport/>
    </GizmoHelper> */}
    {/* <axesHelper args={[5]} /> */}
    {/* <gridHelper args={[20, 20 , "red", "skyblue"]} /> */}

    
  {/* <LightWithHelper /> */}
  
    {/* <Box position={[0, 1, 0]} size={[1, 1, 1]}  /> */}

    {/* <Test position={[0, 0, 0]} size={[20,20]}  /> */}
  
   {/* <pointLight position={[2, 6, -10]} intensity={200} /> */}
<ambientLight intensity={3} />
   
    {/* <Circle  position={[0, 0, 0]} size={[1.5, 80, 80]} color={'orange'}/> */}
      <Model  />
   </Canvas>
  )
}

export default App
