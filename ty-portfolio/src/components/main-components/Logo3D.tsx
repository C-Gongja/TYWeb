import React, { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';


function RotatingMesh({ geometry }) {
	const meshRef = useRef<THREE.Mesh | null>(null);
	const [time, setTime] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [hasNoddedTwice, setHasNoddedTwice] = useState(false);

	useFrame(() => {
		if (meshRef.current) {
			// Enable nodding if hovered OR if it hasn't completed 2 nods initially
			if (isHovered || !hasNoddedTwice) {
				const angle = Math.sin(time) * (Math.PI / 20); // Smooth nodding motion
				meshRef.current.rotation.z = angle;

				// Increment time for animation
				setTime((prevTime) => prevTime + 0.08);

				// Stop initial nodding after 2 full nods (Math.PI * 4)
				if (time >= Math.PI * 4) {
					setHasNoddedTwice(true);
				}
			}
		}
	});

	return (
		<group>
			{/* ✅ Invisible Large Hover Area */}
			<mesh
				onPointerOver={() => setIsHovered(true)}
				onPointerOut={() => setIsHovered(false)}
			>
				<sphereGeometry args={[2, 2, 2]} /> {/* Invisible larger sphere */}
				<meshBasicMaterial transparent opacity={0} />
			</mesh>

			{/* ✅ Actual Mesh */}
			<mesh ref={meshRef} scale={[1, 1, 1]} castShadow receiveShadow>
				<primitive object={geometry} />
				<meshStandardMaterial color="#7761a9" />
			</mesh>
		</group>
	);
}

function LogoThree({ url }) {  // props로 url 받기
	const geometry = useLoader(STLLoader, url); // 파일 경로를 문자열로 전달

	return (
		<div className="h-[400px] sm:h-[400px] md:h-[400px] lg:w-full lg:h-[500px] xl:w-[500px] xl:h-[700px] cursor-pointer">
			<Canvas
				shadows
				camera={{ position: [-3, -3, 0], fov: 50 }}
			>
				<Suspense fallback={<div>Loading...</div>}>
					{/* ✅ 위에서 비추는 조명 */}
					<directionalLight position={[5, 5, 3]} intensity={5} castShadow />
					<ambientLight intensity={1.5} />
					<pointLight position={[2, 2, 2]} intensity={1} />

					{/* ✅ STL 모델 */}
					<RotatingMesh geometry={geometry} />

					{/* ✅ 마우스 컨트롤 (위 아래로만) */}
					<OrbitControls
						enableZoom={false} // 확대/축소 비활성화
						enablePan={false}  // 📌 패닝(이동) 비활성화

						// ✅ 위아래(Polar Angle) 모션 고정
						minPolarAngle={Math.PI / 3} // 🔼 최소 Polar Angle (90도)
						maxPolarAngle={Math.PI / 2} // 🔽 최대 Polar Angle (90도)

						minAzimuthAngle={-Math.PI / 6} // ⬅️ 좌측 최대 회전 각도 (-30도)
						maxAzimuthAngle={0}  // ➡️ 우측 최대 회전 각도 (30도)
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}

export default LogoThree;
