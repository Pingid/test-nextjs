import { getGithubPreviewProps, parseJson } from "next-tinacms-github"
import { GetStaticPropsContext } from "next"

export const getGitFile = <T extends any>(absolutePath: string, getData: () => Promise<T>) => ({
  preview,
  previewData,
}: GetStaticPropsContext) =>
  getData()
    .then((data) => ({
      error: null,
      preview: !!preview,
      file: { data, fileRelativePath: absolutePath, sha: "" },
    }))
    .then((y) =>
      preview
        ? getGithubPreviewProps({
            ...previewData,
            fileRelativePath: absolutePath,
            parse: parseJson,
          }).then((x) => ({ ...y, ...x.props, file: x.props.file || y.file }))
        : y
    )

type PromiseOf<T> = T extends Promise<infer D> ? D : never
export const mapToProps = <T extends { [x: string]: (p: GetStaticPropsContext) => Promise<any> }>(
  files: T
) => (
  ctx: GetStaticPropsContext
): Promise<{ props: { [K in keyof T]: PromiseOf<ReturnType<T[K]>> } }> =>
  Object.keys(files)
    .reduce(
      (a, b) => a.then((x) => files[b](ctx).then((y) => ({ ...x, [b]: y }))),
      Promise.resolve({} as { [K in keyof T]: PromiseOf<ReturnType<T[K]>> })
    )
    .then((props) => ({ props: { ...props, preview: !!ctx.preview } }))
