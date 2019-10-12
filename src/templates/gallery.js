import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor'
import GalleryGrid from './../components/gallery/galleryGrid'
import SEO from './../components/general/SEO'
import Arrow from './../components/general/Arrow'

configureAnchors({
  offset: -32,
  scrollDuration: 1000,
})

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'Content';
  max-width: 100%;
`
const Content = styled.div`
  grid-area: Content;
  display: flex;
  height: calc(100vh - 9rem);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  @media screen and (min-width: 52em) {
    height: calc(100vh - 7rem);
    margin: 1rem;
    section {
      width: 76.4%;
    }
  }
  @media screen and (min-width: 64em) {
    height: calc(100vh);
    margin: 0;
    section {
      width: 61.8%;
    }
  }
`
const Galleries = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  section {
    display: grid;
    grid-template-rows: repeat(1fr);
    grid-gap: 1rem;
    width: 100%;
  }
`

const GalleryTemplate = ({ data }) => {
  const gallery = data.contentfulExtendedGallery
  const subGalleries = data.contentfulExtendedGallery.galleries
  return (
    <>
      <SEO
        title={gallery.title}
        image={gallery.shareImage}
        description={gallery.body.childMarkdownRemark.metaExcerpt}
      />
      <Wrapper>
        <Content>
          <ScrollableAnchor id="top">
            <section>
              <h1>{gallery.title}</h1>
              <article
                dangerouslySetInnerHTML={{
                  __html: gallery.body.childMarkdownRemark.html,
                }}
              />
            </section>
          </ScrollableAnchor>
          <Arrow anchor="#bottom" />
        </Content>
        <Galleries>
          <ScrollableAnchor id="bottom">
            <section>
              {subGalleries.map((subGallery, index) => (
                <div key={index}>
                  {subGallery.__typename === 'ContentfulSubGallery' && (
                    <GalleryGrid
                      key={subGallery.id}
                      slug={subGallery.slug}
                      images={subGallery.images}
                      title={subGallery.title}
                      itemsPerRow={[3, 3, 5, 7]}
                    />
                  )}
                </div>
              ))}
            </section>
          </ScrollableAnchor>
        </Galleries>
      </Wrapper>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulExtendedGallery(slug: { eq: $slug }) {
      title
      id
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "MMMM DD, YYYY")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
      shareImage {
        ogimg: resize(width: 1200) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
          metaExcerpt: excerpt
        }
      }
      galleries {
        __typename
        ... on ContentfulSubGallery {
          id
          slug
          title
          images {
            id
            title
            fluid(maxWidth: 1600, quality: 50) {
              ...GatsbyContentfulFluid_withWebp
              src
              aspectRatio
            }
            thumbnail: fluid(maxWidth: 500, quality: 20) {
              ...GatsbyContentfulFluid_withWebp
              src
              aspectRatio
            }
          }
        }
      }
    }
  }
`
export default GalleryTemplate
