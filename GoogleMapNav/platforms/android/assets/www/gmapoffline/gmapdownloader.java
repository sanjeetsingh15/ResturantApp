/** ===========================================================
 *  GMapOffline : open source google map offline - Java
 *  ===========================================================
 *  
 *  This program use for download all required google map files 
 *  from google.maps server. This supported only google version 132e.
 *  
 *  This application is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public
 *  License for more details.
 *  
 *  @author		JiiiY 
 *  @assistant	Topping
 */
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;


public class gmapdownloader {
	
	/**
	 * Static Variable
	 */
	public String app_path = System.getProperty("user.dir") + "/";
	public String mapfiles = "http://maps.google.com/mapfiles/mapfiles/132e/map2";
	
	
	
	//**************************** Function *********************************
	public int coord_to_tile_x(int zl,double lat,double lng){

		lng += 180.0;
		int world_tiles = (int) Math.pow(2,zl);
		double x = (int)(world_tiles / 360.0 * lng);
		/*
		double tiles_pre_radian = world_tiles / (2 * Math.PI);
		double e = Math.sin(lat*(1/180 *Math.PI));
		double y = (int)(world_tiles/2 + 0.5*Math.log((1+e)/(1-e)) * (-tiles_pre_radian));
		*/
		lat += 85.0;
		double y = (world_tiles / 170.0 * lat);
		
		int yi = world_tiles - ( (int)(Math.round(y)) % world_tiles );
		
		return (int)Math.round(x) % world_tiles;
	}
	
	public int coord_to_tile_y(int zl,double lat,double lng){
		
		lng += 180.0;
		int world_tiles = (int) Math.pow(2,zl);
		double x = (int)(world_tiles / 360.0 * lng);
		/*
		double tiles_pre_radian = world_tiles / (2 * Math.PI);
		double e = Math.sin(lat*(1/180 *Math.PI));
		double y = (int)(world_tiles/2 + 0.5*Math.log((1+e)/(1-e)) * (-tiles_pre_radian));
		*/
		lat += 85.0;
		double y = (world_tiles / 170.0 * lat);
		
		int yi = world_tiles - ( (int)(Math.round(y)) % world_tiles );
		
		return yi;
	}
	
	public String downloadToString(String href) {
        
		URLConnection  conn = null;
		StringBuilder  sb   = null;
		BufferedReader bin   = null;
		
		try {
			URL url = new URL(href);
			sb = new StringBuilder();
			conn = url.openConnection();
			bin = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			String line = null;
			while ((line = bin.readLine()) != null) {
				sb.append(line + "\n");
			}
			System.out.println("downloading: " + href );
			bin.close();
		}
		catch (Exception ex){
			ex.printStackTrace();
		}
		return sb.toString();
    } 
	//************************** End Utility Function *********************************
	
	
	
	public boolean download(String href,String filename)
	{
		//mkdir if folder not existed
		File file = new File(app_path+filename);
		if (file.exists()) { 
			System.out.println("already downloaded: " + "./" + filename);
			return true;
		}
		
		URLConnection conn = null;
		OutputStream  out  = null;
		InputStream   in   = null;
		try {
			URL url = new URL(href);
			out = new BufferedOutputStream(new FileOutputStream(file));
			conn = url.openConnection();
			in = conn.getInputStream();
			byte[] buffer = new byte[1024];
			int numRead;
			long numWritten = 0;
			while ((numRead = in.read(buffer)) != -1) {
				out.write(buffer, 0, numRead);
				numWritten += numRead;
			}
			System.out.println("downloading: " + "./" + filename + "\t" + numWritten);
			in.close();
			out.close();
			return true;
		}
		catch (Exception ex){
			ex.printStackTrace();
			return false;
		}
	}
	
	
	
	
	
	
	public void downloadall() throws IOException{
		
		// initial google offline dirs
		String[] godir = {"mapfiles","tiles","mapfiles/132e/maps2","mapfiles/132e/maps2.api","mapfiles/ge/v/1/4"};
		for(int i=0; i<godir.length; i++){
			File dir  = new File(app_path+"/"+godir[i]);
			if (!dir.exists()) {
				dir.mkdirs();
			}
		}
		
		// download images
		download("http://maps.google.com/mapfiles/mapcontrols2.png","mapfiles/mapcontrols2.png");
		download("http://maps.google.com/mapfiles/transparent.png","mapfiles/transparent.png");
		download("http://maps.google.com/mapfiles/openhand.cur","mapfiles/openhand.cur");
		download("http://maps.google.com/mapfiles/closedhand.cur","mapfiles/closedhand.cur");
		download("http://maps.google.com/mapfiles/ms/crosshairs.cur","mapfiles/crosshairs.cur");
		
		// key from tutorial - http://econym.org.uk/gmap/
		//String map_api_key = "ABQIAAAAPDUET0Qt7p2VcSk6JNU1sBSM5jMcmVqUpI7aqV44cW1cEECiThQYkcZUPRJn9vy_TWxWvuLoOfSFBw";
		
		// download common js
		//download("http://maps.google.com/maps?file=api&amp;v=2&amp;key="+map_api_key,"my_googleapi_off.js");
		//download("http://maps.google.com/mapfiles/132e/maps2/main.js","mapfiles/132e/maps2/main.js");
		//download("http://maps.google.com/mapfiles/132e/maps2.api/main.js","mapfiles/132e/maps2.api/main.js");
		download("http://maps.google.com/mapfiles/132e/gc.js","mapfiles/132e/gc.js");
		download("http://maps.google.com/mapfiles/ge/v/1/4/loader.js","mapfiles/ge/v/1/4/loader.js");
		
		
		// download api js
		download("http://maps.google.com/mapfiles/132e/maps2.api/mod_control.js","mapfiles/132e/maps2.api/mod_control.js");
		download("http://maps.google.com/mapfiles/132e/maps2.api/mod_display_manager.js","mapfiles/132e/maps2.api/mod_display_manager.js");
		download("http://maps.google.com/mapfiles/132e/maps2.api/mod_jslinker.js","mapfiles/132e/maps2.api/mod_jslinker.js");
		download("http://maps.google.com/mapfiles/132e/maps2.api/mod_poly.js","mapfiles/132e/maps2.api/mod_poly.js");
		download("http://maps.google.com/cat_js/mapfiles/132e/maps2.api/{mod_poly,mod_mspe}.js","mapfiles/132e/maps2.api/{mod_poly,mod_mspe}.js");
		
		
		
		File file;
		BufferedWriter out = null;
		String js = null;
		
		// get my_googleapi.js and transmogrify
		//js = js.replace("/intl/en_ALL","");
		//js = js.replace("http://maps.google.com/mapfiles/", "../gmapoffline/mapfiles/");
	    //js = js.replace("http://mt0.google.com/mt?", "../gmapoffline/tiles/mt_");
	    //js = js.replace("http://mt1.google.com/mt?", "../gmapoffline/tiles/mt_");
	    //js = js.replace("http://mt2.google.com/mt?", "../gmapoffline/tiles/mt_");
	    //js = js.replace("http://mt3.google.com/mt?", "../gmapoffline/tiles/mt_");
		
		// get main.js and transmogrify
		file = new File(app_path + "mapfiles/132e/maps2/main.js");
		if(!file.exists()){
			js = downloadToString("http://maps.google.com/mapfiles/132e/maps2/main.js");
		    js = js.replace( "\"&s=\",f]", "\"\",\".jpeg\"]");
		    out = new BufferedWriter(new FileWriter(file));
		    out.write(js);
		    out.close();
		}
	    
	    // get main2.js and transmogrify
		file = new File(app_path + "mapfiles/132e/maps2.api/main.js");
		if(!file.exists()){
			js = downloadToString("http://maps.google.com/mapfiles/132e/maps2.api/main.js");
		    js = js.replace( "\"&s=\",f]", "\"\",\".jpeg\"]");
		    out = new BufferedWriter(new FileWriter(file));
		    out.write(js);
		    out.close();
		}
		
	    
	    
		//get main.js and transmogrify
		//js = js.replace("s=p+\"/cat_js\"+n+\"%7B\"","s=p+\"\"+n+\"%7B\"");
		//js = js.replace( "\"&s=\",f]", "\"\",\".jpeg\"]");
		
		
		//get {mod_poly,mod_mspe}.js and transmogrify
		//js= js.replace("ms/crosshairs.cur","crosshairs.cur");
		
		
		//download map
		String ver = "w2p.87";//terrain
		for(int z=zl_min; z<=zl_max; z++){
			
			int x_min = coord_to_tile_x(z,lat_bgn,lng_bgn);
			int y_max = coord_to_tile_y(z,lat_bgn,lng_bgn);
			
			int x_max = coord_to_tile_x(z,lat_end,lng_end);
			int y_min = coord_to_tile_y(z,lat_end,lng_end);
			
			for(int x=x_min; x<=x_max; x++){
				for(int y=y_min; y<=y_max; y++){
					String mapparams = "x="+x+"&y="+y+"&z="+z;
					download("http://mt"+((x+y)%4)+".google.com/mt?v="+ver+"&hl=en&"+mapparams, "tiles/mt_"+mapparams+".jpeg");
				}
			}
		}
		//end
		System.out.println( "========================== finished ==========================");
	}
	

	//default
	public static int zl_min = 6;
	public static int zl_max = 9;
	public static double lat_bgn = 4;
	public static double lat_end = 10;
	public static double lng_bgn = 96;
	public static double lng_end = 106;
	
	public static void main(String args[]){
		
		for(int i=0; i<args.length; i++){
			String arg = args[i];
			if(arg.indexOf("-zoom:")==0){
				arg = arg.replace("-zoom:","");
				zl_min = Integer.parseInt( arg.split("-")[0] );
				zl_max = Integer.parseInt( arg.split("-")[1] );
			}
			if (arg.indexOf("-lat")==0){
				arg = arg.replace("-lat:","");
				lat_bgn = Integer.parseInt( arg.split("-")[0] );
				lat_end = Integer.parseInt( arg.split("-")[1] );
			}
			if (arg.indexOf("-lng")==0){
				arg = arg.replace("-lng:","");
				lng_bgn = Integer.parseInt( arg.split("-")[0] );
				lng_end = Integer.parseInt( arg.split("-")[1] );
			}
		}
		
		gmapdownloader gmd = new gmapdownloader();
		try{
			gmd.downloadall();
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
}
