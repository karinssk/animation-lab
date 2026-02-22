'use client';

import ObjectViewer from '../components/ObjectViewer';

export default function RenderOBJPage() {
    return (
        <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <ObjectViewer modelPath="/models/base.obj" />
        </main>
    );
}
