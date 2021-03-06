import React from "react"
import { graphql } from "gatsby"
import Layout from "@layouts/main-layout"
import BlogListParts from "@/components/bloglist_parts"
import { Colors } from "@/utils/colors"

export const query = graphql`
  query TagsPosts($tags: String!) {
    allPosts: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { eq: $tags } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
            learning_Point
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const Tags = ({ data, pageContext }) => {
  let colored = Colors(pageContext.tags)
  return (
    <Layout>
      <div className="pt-12 w-full mb-4">
        <div className="flex w-10/12 mx-auto px-4 md:pl-40 md:pr-8 md:pb-6 max-w-6xl">
          <p
            className={`text-3xl md:text-4xl font-extrabold tracking-wide ${colored.text}`}
          >
            {pageContext.tags}
          </p>
        </div>
      </div>
      <div className="pt-4">
        <div className=" w-10/12 mx-auto px-4 md:pl-40 md:pr-8 max-w-6xl">
          <div className="mb-6 pt-4 fadeIn_animation mx-auto">
            <div className="space-y-12">
              {data.allPosts.edges.map(({ node }) => {
                return <BlogListParts node={node} key={node.fields.slug} />
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Tags
