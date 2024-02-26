import Release from './Release';
import { getByIdOrThrow } from './get';
import { ReleaseGetSchema, } from './schemas';

export default async function lineage(input: ReleaseGetSchema): Promise<Release[]> {
    const { id } = input;

    const requestedRelease: Release = await getByIdOrThrow({ id, includeArchived: true });

    let releaseDataList: Release[] = [requestedRelease];
    let parentId = requestedRelease?.parentId

    while (parentId) {
        const release: Release = await getByIdOrThrow({ id: parentId, includeArchived: true });
        releaseDataList.push(release);
        parentId = release.parentId
    }

    return releaseDataList
}
