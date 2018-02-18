import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <title>Conference</title>

          <link href="inspina/css/bootstrap.min.css" rel="stylesheet" />
          <link href="inspina/font-awesome/css/font-awesome.css" rel="stylesheet" />
          <link href="inspina/css/animate.css" rel="stylesheet" />
          <link href="inspina/css/plugins/codemirror/codemirror.css" rel="stylesheet" />
          <link href="inspina/css/plugins/codemirror/ambiance.css" rel="stylesheet" />
          <link href="inspina/css/plugins/toastr/toastr.min.css" rel="stylesheet" />
          <link href="inspina/js/plugins/gritter/jquery.gritter.css" rel="stylesheet" />
          <link href="inspina/css/style.css" rel="stylesheet" />
          <link href="css/conference.css" rel="stylesheet" />

          <script src="js/pace.init.js"></script>

          <script src="inspina/js/jquery-3.1.1.min.js"></script>
          
        </Head>
        <body className="fixed-sidebar no-skin-config full-height-layout">
          {this.props.customValue}

<div id="wrapper">

    <div id="page-wrapper" className="gray-bg">
    <div className="row border-bottom">
    <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
    <div className="navbar-header">
        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
        <h2 className="m-r-sm text-muted nav-message nav-logo">Logo</h2>
    </div>
        <ul className="nav navbar-top-links navbar-right">
            <li>
                <a className="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                    <span className="m-r-sm text-muted nav-message">Help</span>
                    <i className="fa fa fa-question"></i>
                </a>
            </li>
        </ul>

        <ul className="nav navbar-top-links navbar-right" style={{ marginRight: 'calc(50% - 200px)' }}>
            <li>
                <a className="dropdown-toggle tool-time" data-toggle="dropdown" href="#">
                    <i className="fa fa-clock-o"></i>
                    <span className="m-r-sm text-muted nav-message">00 : 00</span>
                </a>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle tool-hangup" data-toggle="dropdown" href="#">
                    <i className="fa fa-phone"></i>
                </a>
            </li>
            <li className="dropdown">
                <a className="dropdown-toggle tool-play" data-toggle="dropdown" href="#">
                    <i className="fa fa-caret-right"></i>
                </a>
            </li>
        </ul>

    </nav>
    </div>
        <div className="fh-breadcrumb">

            <div className="fh-column" style={{ float: 'right' }}>
                <div className="video-main" id="local-media">
                    <i className="fa fa-user-o"></i>
                </div>
                <div className="full-height-scroll">
                    <ul className="list-group elements-list">
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-1">
                                <small className="pull-right text-muted"> 16.02.2015</small>
                                <strong>Ann Smith</strong>
                                <div className="small m-t-xs">
                                    <p>
                                        Survived not only five centuries, but also the leap scrambled it to make.
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> Riviera State 32/106
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item active">
                            <a data-toggle="tab" href="#tab-2">
                                <small className="pull-right text-muted"> 11.10.2015</small>
                                <strong>Paul Morgan</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        There are many variations of passages of Lorem Ipsum.
                                        <br/>
                                    </p>
                                    <p className="m-b-none">

                                        <span className="label pull-right label-primary">SPECIAL</span>
                                        <i className="fa fa-map-marker"></i> California 10F/32
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-3">
                                <small className="pull-right text-muted"> 08.04.2015</small>
                                <strong>Michael Jackson</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        Look even slightly believable. If you are going to use a passage of.
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> Berlin 120R/15
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-4">
                                <small className="pull-right text-muted"> 16.02.2015</small>
                                <strong>Mark Smith</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        It was popularised in the 1960s with the release of Letraset sheets
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> San Francisko 12/100
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-1">
                                <small className="pull-right text-muted"> 21.04.2015</small>
                                <strong>Monica Novak</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        Printer took a galley of type and scrambled.
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> New York 15/43
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-2">
                                <small className="pull-right text-muted"> 03.12.2015</small>
                                <strong>Jack Smith</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        Also the leap into electronic typesetting, remaining.
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> Sant Fe 10/106
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-3">
                                <small className="pull-right text-muted"> 08.04.2015</small>
                                <strong>Michael Jackson</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        Look even slightly believable. If you are going to use a passage of.
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> Berlin 120R/15
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-4">
                                <small className="pull-right text-muted"> 16.02.2015</small>
                                <strong>Mark Smith</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        It was popularised in the 1960s with the release of Letraset sheets
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> San Francisko 12/100
                                    </p>
                                </div>
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a data-toggle="tab" href="#tab-1">
                                <small className="pull-right text-muted"> 21.04.2015</small>
                                <strong>Monica Novak</strong>
                                <div className="small m-t-xs">
                                    <p className="m-b-xs">
                                        Printer took a galley of type and scrambled.
                                    </p>
                                    <p className="m-b-none">
                                        <i className="fa fa-map-marker"></i> New York 15/43
                                    </p>
                                </div>
                            </a>
                        </li>


                    </ul>

                </div>
            </div>

            <div className="full-height">
                <div className="full-height-scroll white-bg border-right">

                    <div className="element-detail-box">

                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane">

                                <div className="pull-right">
                                    <div className="tooltip-demo">
                                        <button className="btn btn-primary" data-toggle="tooltip" data-placement="left" title="Plug this message"><i className="fa fa-plug"></i> Share Screen</button>
                                    </div>
                                </div>
                                <div className="small text-muted">
                                    <i className="fa fa-clock-o"></i> Friday, 12 April 2014, 12:32 am
                                </div>

                                <h1>
                                    Their separate existence is a myth
                                </h1>

                                <p>
                                    The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.
                                </p>
                                <p>
                                    The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.
                                </p>
                                <p>
                                    The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.
                                </p>

                                <p>
                                    The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.
                                </p>
                                <p>
                                    The new common language will be more simple and regular than the existing European languages. It will be as simpl.
                                </p>
                                <p>
                                    To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.
                                </p>
                                <p>
                                    The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls.
                                </p>
                                <p>
                                    It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words.
                                </p>

                                <p>
                                    The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary.
                                </p>
                                <p>
                                    To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is.
                                </p>
                                <p className="small">
                                    <strong>Best regards, Anthony Smith </strong>
                                </p>

                                <div className="m-t-lg">
                                    <p>
                                        <span><i className="fa fa-paperclip"></i> 2 attachments - </span>
                                        <a href="#">Download all</a>
                                        |
                                        <a href="#">View all images</a>
                                    </p>

                                    <div className="attachment">
                                        <div className="file-box">
                                            <div className="file">
                                            </div>

                                        </div>
                                        <div className="file-box">
                                            <div className="file">
                                            </div>

                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>

                            </div>

                            <div id="tab-2" className="tab-pane active">
                                <div className="pull-right">
                                    <div className="tooltip-demo">
                                            <button id="button-share-screen" className="btn btn-primary" data-toggle="tooltip" data-placement="left" title="Start sharing your screen."><i className="fa fa-desktop"></i> Share Screen</button>
                                            <button id="button-unshare-screen" className="btn btn-primary" data-toggle="tooltip" data-placement="left" title="Stop sharing your screen."><i className="fa fa-desktop"></i> Stop Share Screen</button>
                                    </div>
                                </div>
                                <div className="small text-muted">
                                    <i className="fa fa-clock-o"></i> [App Tabs]
                                </div>

                                <Main />
                                <NextScript />

                                <h1 className="header-app">
                                    Whiteboard
                                </h1>
                                <div className="whiteboard-app">
                                    <div id="app-notifications"></div>
                                    <div id="remote-media"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>

    <div className="footer">
        <div className="pull-right">
            10GB of <strong>250GB</strong> Free.
        </div>
        <div>
            <strong>Copyright</strong> Example Company &copy; 2014-2017
        </div>
    </div>

    </div>
    </div>

    <div id="chat-box" className="fh-column" style={{float: 'right'}}>
        <div className="full-height-scroll">
            <ul className="list-group elements-list">
                <li className="list-group-item">
                    <a data-toggle="tab" href="#tab-1">
                        <small className="pull-right text-muted"> 16.02.2015</small>
                        <strong>Ann Smith</strong>
                        <div className="small m-t-xs">
                            <p>
                                Survived not only five centuries, but also the leap scrambled it to make.
                            </p>
                            <p className="m-b-none">
                                <i className="fa fa-map-marker"></i> Riviera State 32/106
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>


<script src="inspina/js/bootstrap.min.js"></script>
<script src="inspina/js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="inspina/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<script src="inspina/js/inspinia.js"></script>

<script src="https://cdn.WebRTC-Experiment.com/getScreenId.js"></script>

        </body>
      </html>
    )
  }
}